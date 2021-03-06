import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth';
import * as fromLoginPage from './login-page';

export interface AuthState {
    status: fromAuth.State;
    loginPage: fromLoginPage.State;
}

export interface State {
    auth: AuthState;
}

export const reducers = {
    status: fromAuth.reducer,
    loginPage: fromLoginPage.reducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AuthState) => state.status
);
export const getLoggedIn = createSelector(
    selectAuthStatusState,
    fromAuth.getLoggedIn
);
export const getUser = createSelector(
    selectAuthStatusState,
    fromAuth.getAuthenticatedUser
);

export const selectLoginPageState = createSelector(
    selectAuthState,
    (state: AuthState) => state.loginPage
);
export const getLoginPageError = createSelector(
    selectLoginPageState,
    fromLoginPage.getError
);
export const getLoginPagePending = createSelector(
    selectLoginPageState,
    fromLoginPage.getPending
);



