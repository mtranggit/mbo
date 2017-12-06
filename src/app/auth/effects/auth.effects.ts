import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../services/auth.service';
import * as authAction from '../actions/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$
    .ofType(authAction.LOGIN)
    .map((action: authAction.LoginAction) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .login(auth)
        .map(user => new authAction.LoginSuccessAction({ user }))
        .catch(error => of(new authAction.LoginFailureAction(error)))
    );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(authAction.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/']));

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(authAction.LOGIN_REDIRECT, authAction.LOGOUT)
    .do(authed => {
      this.router.navigate(['/login']);
    });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
