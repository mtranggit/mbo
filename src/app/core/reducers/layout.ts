import * as layoutAction from '../actions/layout';

export interface State {
    showSideNav: boolean;
    showDropDownNav: boolean;
}

const initialState: State = {
    showSideNav: false,
    showDropDownNav: false
};

export function reducer(state = initialState, action: layoutAction.Actions): State {
    switch (action.type) {
        case layoutAction.CLOSE_SIDENAV: {
            return {
                ...state,
                showSideNav: false
            };
        }
        case layoutAction.OPEN_SIDENAV: {
            return {
                ...state,
                showSideNav: true
            };
        }
        case layoutAction.CLOSE_TOPNAV: {
            return {
                ...state,
                showDropDownNav: false
            };
        }
        case layoutAction.OPEN_TOPNAV: {
            return {
                ...state,
                showDropDownNav: true
            };
        }
        default: {
            return state;
        }

    }
}
