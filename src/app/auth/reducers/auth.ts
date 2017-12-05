
import * as fromAuth from '../actions/auth';
import { AuthenticatedUser } from '../models/user';

export interface State {
    loggedIn: boolean;
    user: AuthenticatedUser | null;
}

export const initialState = {
    loggedIn: false,
    user: null
};

export function authReducer(state = initialState, action: fromAuth.Actions): State {
    switch (action.type) {
        case fromAuth.LOGIN_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                user.action.payload.user
            };
        }
        case fromAuth.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
export const getLoggedIn = (state: State) => state.loggedIn;
export const getAuthenticatedUser = (state: State) => state.user;
