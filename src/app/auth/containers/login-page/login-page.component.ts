import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../models/user';
import * as fromAuth from '../../reducers';
import * as authAction from '../../actions/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mac-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  pending$ = this.store.select(fromAuth.getLoginPagePending);
  error$ = this.store.select(fromAuth.getLoginPageError);
  constructor(private store: Store<fromAuth.State>) {
  }

  // pending$: Observable<boolean>;
  // error$: Observable<string>;
  // constructor(private store: Store<fromAuth.State>) {
  //   this.pending$ = this.store.select(fromAuth.getLoginPagePending);
  //   this.error$ = this.store.select(fromAuth.getLoginPageError);
  // }

  ngOnInit() {
  }

  onSubmit($event: Authenticate) {
    this.store.dispatch(new authAction.LoginAction($event));
  }

}
