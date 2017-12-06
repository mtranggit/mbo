import { Action } from '@ngrx/store';
import { AuthenticatedUser, Authenticate } from '../models/user';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_REDIRECT = 'LOGIN_REDIRECT';

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: { user: AuthenticatedUser }) {}
}

export class LoginFailureAction implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export class LoginRedirectAction implements Action {
  readonly type = LOGIN_REDIRECT;

  constructor() {}
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;

  constructor() {}
}

export type Actions =
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | LoginRedirectAction
  | LogoutAction;
