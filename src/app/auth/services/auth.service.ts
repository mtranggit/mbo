import { Injectable } from '@angular/core';

import { Authenticate } from '../models/user';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class AuthService {

  constructor() { }

  login({ username, password}: Authenticate) {
    // Simulate login
    if (username !== 'test') {
      return _throw('Invalid username or password');
    }
    return of ({ name: 'John Doe'});
  }

  logout() {
    return of(true);
  }

}
