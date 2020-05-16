import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { ConfigService } from '../utils/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Emergency, EMERGENCY_UKRAINE_NAME_TO_BACKEND_NAME, EMERGENCY_FE_NAME_TO_ID } from '../models/emergency';

@Injectable()

export class EventService {

    baseUrl: string;
    events: BehaviorSubject<Event[]> = new BehaviorSubject([])
    currentEvents = this.events.asObservable();

    constructor(private configService: ConfigService,
        private http: HttpClient) {
        this.baseUrl = this.configService.getApiURI();
        this.getAllEvents();

    }

    getAllEvents() {
        this.http.get<Event[]>(this.baseUrl + "/Events").subscribe(data => this.events.next(data))
    }

    getEventsByEmergency(id: number) {
        this.http.get<Emergency[]>(this.baseUrl + "/Emergencies/" + id).subscribe(data => {
            let events: Event[] = [];
            data.forEach(emergency => events.push(...emergency.events))
            this.events.next(events)
        })
    }

    getEventsByYear(date: Date) {
        this.http.get<Event[]>(this.baseUrl + "/Events/dates/" + date.toISOString()).subscribe(data => this.events.next(data));
    }

    getEventsByYearAndEmergency(date: Date, id: number) {
        this.http.get<Event[]>(this.baseUrl + `/Events/${date.toISOString()}/${id}`).subscribe(data => this.events.next(data) );
    }


    getAvailableDate(): Observable<Date[]> {
        return this.http.get<Date[]>(this.baseUrl + "/Events/dates");
    }

    addEvent(event: Event): void {
        console.log(event)
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
        };
        this.http.post(this.baseUrl + "/Events/add", event, httpOptions).subscribe(data => console.log(data));
    }

}