
import * as authAction from '../actions/auth';
import { AuthenticatedUser } from '../models/user';

export interface State {
    loggedIn: boolean;
    user: AuthenticatedUser | null;
}

export const initialState = {
    loggedIn: false,
    user: null
};

export function reducer(state = initialState, action: authAction.Actions): State {
    switch (action.type) {
        case authAction.LOGIN_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                user: action.payload.user
            };
        }
        case authAction.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
export const getLoggedIn = (state: State) => state.loggedIn;
export const getAuthenticatedUser = (state: State) => state.user;
