import * as authAction from '../actions/auth';

export interface State {
    error: string | null;
    pending: boolean;
}

export const initialState: State = {
    error: null,
    pending: false
};

export function reducer(state = initialState, action: authAction.Actions): State {
    switch (action.type) {
        case authAction.LOGIN: {
            return {
                ...state,
                error: null,
                pending: true
            };
        }
        case authAction.LOGIN_SUCCESS: {
            return {
                ...state,
                error: null,
                pending: false
            };
        }
        case authAction.LOGIN_FAILURE: {
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        }
        default: {
            return state;
        }
    }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
