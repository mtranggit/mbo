import { Injectable, Injector, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { map, catchError, switchMap, finalize, tap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';

import { AuthService, OAuthData } from '../services';
import { Store } from '@ngrx/store';
import * as fromAuth from '../store/reducers';
import * as authAction from '../store/actions';
import { isNullOrUndefined } from 'util';
import { BASE_URL } from '../../core/base-url.token';
import { API_URL_PATTERNS } from '../../core/api-url.token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private injector: Injector,
    @Inject(BASE_URL) private baseUrl: string,
    @Inject(API_URL_PATTERNS) private apiUrlPatterns: string[],
    private store: Store<fromAuth.State>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.injectTokenIfAvailable(req)).pipe(
      // tap( (item) => console.log('item', item)),
      map(event => event),
      catchError(error => this.handleError(error, req, next))
    );
  }

  handleError(error: any, req: HttpRequest<any>, next: HttpHandler) {

    // console.error('error intercepted', JSON.stringify(error, null, 2));

    const authService = this.injector.get(AuthService);

    if (error instanceof HttpErrorResponse) {
      const errorStatus = error.status;
      const firstErrorObj = error.error && error.error.errors && error.error.errors[0];
      const errorCode = firstErrorObj && firstErrorObj['code'];
      const errorMessage = firstErrorObj && firstErrorObj['message'];
      const errorDesc = firstErrorObj && firstErrorObj['error_description'];

      // console.log({ errorStatus, firstErrorObj, errorCode, errorMessage, errorDesc});

      if (errorStatus === 401 && (errorCode === 'access_token_expired')) {
        // call renew token
        if (!this.isRefreshingToken) {
          this.isRefreshingToken = true;
          this.tokenSubject.next(null);
          return authService.refreshToken().pipe(
            switchMap((oauthdata: OAuthData) => {
              if (oauthdata && authService.getAccessToken()) {
                authService.saveOAuthData(oauthdata);
                this.tokenSubject.next(oauthdata.access_token);
                return next.handle(this.addTokenToHeader(req, oauthdata.access_token));
              }
              // If we don't get a new token, we are in trouble so logout
              return this.logout();
            }),
            catchError( _ => this.logout()),
            finalize( () => this.isRefreshingToken = false)
            );
        } else {
          return this.tokenSubject
            .filter(token => token != null)
            .take(1)
            .switchMap(token => next.handle(this.addTokenToHeader(req, token)));
        }
      } else if ( (errorStatus === 400 && (errorCode === 'invalid_grant' || errorCode === 'already_auth'))
                || (errorStatus === 500 && errorCode === 'server_error') ) {
          // the token is no longer valid so remove oauth data and logout, remove oauth data and relogin
          return this.logout();
      }

    }

    return _throw(error);
  }

  private injectTokenIfAvailable(req: HttpRequest<any>): HttpRequest<any> {
    const authService = this.injector.get(AuthService);
    const accessToken = authService.getAccessToken();
    const clientId = authService.getClientId();
    const url = req.url.toLowerCase();

    // add clientId to the header for all api request
    req = this.addClientIdToHeader(req, clientId);

    if (isNullOrUndefined(accessToken)) {
      return req;
    }

    if (url.startsWith(this.baseUrl) && this.shouldAddOauthTokensToHeader(url)) {
      req = this.addTokenToHeader(req, accessToken);
    }

    return req;
  }

  private logout() {
    this.store.dispatch(new authAction.LogoutAction());
    return of(null);
  }

  private shouldAddOauthTokensToHeader(requestUrl) {
    return (!Array.isArray(this.apiUrlPatterns) || this.apiUrlPatterns.length === 0 || this.apiUrlPatterns.findIndex((pattern) => requestUrl.indexOf(pattern) > -1 ) !== -1);
  }

  private addTokenToHeader(req: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', `Bearer ${accessToken}`) });
  }

  private addClientIdToHeader(req: HttpRequest<any>, clientId: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('client-id', clientId)});
  }

}
