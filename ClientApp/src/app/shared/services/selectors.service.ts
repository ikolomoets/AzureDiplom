import { EventService } from "./event.service";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { EMERGENCY_FE_NAME_TO_ID } from "../models/emergency";

@Injectable()

export class SelectorsService {

    
  currentEmergencyTypeId: number;
  currentEventYear: string;
  dates$: Observable<string[]>;

    constructor(private eventService: EventService) { 
    this.dates$ = this.eventService.getAvailableDate()
            .pipe(map( dates =>  dates.map(date => new Date(date).getFullYear().toString())));

    }


    typeChanged($event) {

        if ($event.target.value == "ВСІ") {
            this.currentEmergencyTypeId = null;
        } else {
            this.currentEmergencyTypeId = EMERGENCY_FE_NAME_TO_ID.get($event.target.value.toUpperCase())
        }
        console.log(this.currentEmergencyTypeId);
        this.getEvents();

    }

    yearChanged($event) {
        if ($event.target.value == "ВСІ" || $event.target.value == "всі") {
            this.currentEventYear = null;
        } else {
            this.currentEventYear = $event.target.value
        }
        console.log(this.currentEventYear, $event.target.value);
        this.getEvents();

    }

    getEvents() {
        console.log(this.currentEmergencyTypeId, this.currentEventYear)
        if (this.currentEmergencyTypeId && this.currentEventYear) {
            this.eventService.getEventsByYearAndEmergency(new Date(this.currentEventYear), this.currentEmergencyTypeId);
        } else if (this.currentEmergencyTypeId) {
            this.eventService.getEventsByEmergency(this.currentEmergencyTypeId);
        } else if (this.currentEventYear) {
            this.eventService.getEventsByYear(new Date(this.currentEventYear));
        } else {
            this.eventService.getAllEvents();
        }

    }
}