import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { HomeDetails } from '../models/home.details.interface';
import { ConfigService } from '../../shared/utils/config.service';

import { BaseService } from '../../shared/services/base.service';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'

//import * as _ from 'lodash';

// Add the RxJS Observable operators we need in this app.

@Injectable()

export class DashboardService extends BaseService {

  baseUrl: string = '';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
  }

  getHomeDetails(): Observable<HomeDetails> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${authToken}`);
    console.log(headers, this.httpOptions.headers)
    return this.http.get(this.baseUrl + "/dashboard/home", this.httpOptions)
      .pipe(map(response => JSON.parse(JSON.stringify(response))),
        catchError(this.handleError)
      );
  }
}
