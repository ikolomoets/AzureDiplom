import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { ConfigService } from '../utils/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class EmergencyService {

    baseUrl: string;

    constructor(private configService: ConfigService,
        private http: HttpClient) {
        this.baseUrl = this.configService.getApiURI();
    }

     getEmergenciesStatistic():Observable<any>{
         return this.http.get<any>(this.baseUrl + "/Emergencies/statistic")
     }
}