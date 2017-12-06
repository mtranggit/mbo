import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import * as authAction from '../actions/auth';
import * as fromAuth from '../reducers/auth';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { take } from 'rxjs/operator/take';
import { map } from 'rxjs/operator/map';

// import 'rxjs/add/operator/take';
// import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<fromAuth.State>) { }

  canActivate(): Observable<boolean> {
    return this.store
      .select(fromAuth.getLoggedIn)
      .map( authed => {
        if (!authed) {
          this.store.dispatch(new authAction.LoginRedirectAction());
          return false;
        }
        return true;
      })
      .take(1);
  }
}
