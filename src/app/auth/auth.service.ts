import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import {throwError, BehaviorSubject, Observable} from 'rxjs';

import { User } from './user.model';
import {LocalStorageService} from '../shared/services/local-storage.service';

export interface AuthResponseData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  token: string;
  nickname: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  public currentUser: Observable<User>;


  constructor(private http: HttpClient, private router: Router) {
  }

  public get currentUserValue(): User {
    return this.user.value;
  }


  login(params) {
    return this.http
      .post<any>(`https://codelabs2021.herokuapp.com/api/v1/users/login`, params)
      .pipe(
        catchError(this.handleError),
        tap(resPayload => {
          const resData = resPayload.payload;
          this.handleAuthentication(resData);
        })
      );
  }

  autoLogin() {
    const userData: {
      id: number;
      firstName: string;
      lastName: string;
      name: string;
      email: string;
      nickname: string;
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData);

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }


  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }


  private handleAuthentication(resData) {
    const user = new User(resData);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }


}
