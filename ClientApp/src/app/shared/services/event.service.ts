import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { ConfigService } from '../utils/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Emergency, EMERGENCY_UKRAINE_NAME_TO_BACKEND_NAME } from '../models/emergency';

@Injectable()

export class EventService {  
    
    baseUrl: string;
    events : BehaviorSubject<Event[]> = new BehaviorSubject([])
    currentEvents = this.events.asObservable();

    constructor( private configService: ConfigService,
                private http: HttpClient) { 
    this.baseUrl = this.configService.getApiURI();
    }

    getAllEvents(){
        this.http.get<Event[]>(this.baseUrl + "/Events").subscribe( data => this.events.next(data))
    }

    getEmergency(name: string){
        console.log(name, EMERGENCY_UKRAINE_NAME_TO_BACKEND_NAME.get(name.toUpperCase()));
        this.http.get<Emergency[]>(this.baseUrl + "/Emergencies/" + EMERGENCY_UKRAINE_NAME_TO_BACKEND_NAME.get(name.toUpperCase())).subscribe( data => {
            let events: Event[] = [];
            data.forEach(emergency => events.push(...emergency.events))
            this.events.next(events)
        })

    }

    getAvailableDate():Observable<string[]>{
        return this.http.get<string[]>(this.baseUrl + "/Events/dates");
    }

    addEvent(event: Event):void{
        console.log(event)
       let  httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
          };
        this.http.post(this.baseUrl + "/Events/add", event, httpOptions).subscribe(data => console.log(data));
    }
    
}