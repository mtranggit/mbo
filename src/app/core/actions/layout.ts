import { Action } from '@ngrx/store';

export const OPEN_SIDENAV = 'OPEN_SIDENAV';
export const CLOSE_SIDENAV = 'CLOSE_SIDENAV';
export const OPEN_TOPNAV = 'OPEN_TOPNAV';
export const CLOSE_TOPNAV = 'CLOSE_TOPNAV';

export class OpenSideNavAction implements Action {
    readonly type = OPEN_SIDENAV;
}

export class CloseSideNavAction implements Action {
    readonly type = CLOSE_SIDENAV;
}

export class OpenTopNavAction implements Action {
    readonly type = OPEN_TOPNAV;
}

export class CloseTopNavAction implements Action {
    readonly type = CLOSE_TOPNAV;
}

export type Actions
    = OpenSideNavAction
    | CloseSideNavAction
    | OpenTopNavAction
    | CloseTopNavAction;
