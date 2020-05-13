import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import {BaseService} from "./base.service";

import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//import * as _ from 'lodash';

// Add the RxJS Observable operators we need in this app.

@Injectable()

export class UserService extends BaseService {

  baseUrl: string = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

    register(email: string, password: string, firstName: string, lastName: string,location: string): Observable<boolean> {
    let body = JSON.stringify({ email, password, firstName, lastName,location });
console.log(this.baseUrl + "/accounts")
    return this.http.post(this.baseUrl + "/accounts", body, this.httpOptions)
      .pipe(map(res => true),
      catchError(this.handleError));
  }  

   login(userName, password) {
    console.log(this.baseUrl + '/auth/login', JSON.parse(JSON.stringify({ userName, password })), this.httpOptions)
    
    // this.http
    //   .post(
    //   this.baseUrl + '/auth/login',
    //   JSON.stringify({ userName, password }), this.httpOptions
    //   ).subscribe(data => {console.log(data)})
    return this.http
      .post(
      this.baseUrl + '/auth/login',
      JSON.stringify({ userName, password }), this.httpOptions
      )
      .pipe(map(res => { console.log(res); return JSON.parse( JSON.stringify(res))}),
      map(res => {
        localStorage.setItem('auth_token', res.auth_token);
        console.log(res, localStorage);

        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      }),
      catchError(this.handleError)
      );
    return null;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }  
}

