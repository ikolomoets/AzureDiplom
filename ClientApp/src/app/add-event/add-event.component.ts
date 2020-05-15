import { Component, OnInit } from '@angular/core';
import { Marker } from '../shared/models/Marker';
import { Event } from '../shared/models/event';
import {NgbDateParserFormatter, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { EMERGENCY_FE_NAME_TO_ID } from '../shared/models/emergency';
import { EventService } from '../shared/services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  constructor( private ngbDateParserFormatter: NgbDateParserFormatter,
    private eventService: EventService) { }

  newMarker: Marker;
  currentEvent: Event;
  latitude: number;
  longitude: number;
  zoom: number;
  currentEventDate: NgbDate;
  emergencyType: string;

  ngOnInit() {
    this.newMarker = new Marker();
    this.newMarker = { lat: 0, lng: 0,name: "", address: "", desc: "" };
    this.currentEvent = new Event();

    // this.currentEventDate = new Date('2020');
    // console.log(this.currentEventDate.toISOString(), this.currentEventDate)
    this.latitude = 49.045639;
    this.longitude = 31.159608;
    this.zoom = 5.2;
  }

  addMarker(lat: number, lng: number) {
    this.newMarker.lat = lat;
    this.newMarker.lng = lng;
    console.log(this.newMarker)
  }

  onSubmited() {
    this.currentEvent.harmed = (this.currentEvent.harmed && this.currentEvent.harmed > 0 ) ? this.currentEvent.harmed : 0;
    this.currentEvent.deaths = (this.currentEvent.deaths && this.currentEvent.deaths > 0 ) ? this.currentEvent.deaths : 0;
    this.currentEvent.losses = (this.currentEvent.losses && this.currentEvent.losses > 0 ) ? this.currentEvent.losses : 0;
    this.currentEvent.costs = (this.currentEvent.costs && this.currentEvent.costs > 0 ) ? this.currentEvent.costs : 0;

    this.currentEvent.date = new Date(this.ngbDateParserFormatter.format(this.currentEventDate)).toISOString();
    this.currentEvent.emergencyId = EMERGENCY_FE_NAME_TO_ID.get(this.emergencyType.toUpperCase());

    this.currentEvent.eventPosition.x = this.newMarker.lat
    this.currentEvent.eventPosition.y = this.newMarker.lng
    console.log(this.newMarker, this.currentEvent);

    this.eventService.addEvent(this.currentEvent);
  }
}
