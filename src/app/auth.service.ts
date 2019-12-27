import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: { username: string, password: string};
  credentials = 'demo';

  constructor() {
    this.getStoredUser();
  }

  logIn(username: string, password: string): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(() => {
        if (
          username === this.credentials &&
          password === this.credentials
        ) {
          this.user = { username, password };
          this.storeUser();
          return true;
        }
        throw new Error('Please use \'demo\' as username and password');
      }));
  }

  getStoredUser() {
    const user = sessionStorage.getItem('user');
    if (!user) { return; }
    this.user = JSON.parse(user);
    console.log('User loaded');
  }

  storeUser() {
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }
}
