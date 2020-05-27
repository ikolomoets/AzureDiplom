import { Component, OnInit, Input } from '@angular/core';
import { Marker } from '../shared/models/Marker';
import { Event } from '../shared/models/event';
import {NgbDateParserFormatter, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { EMERGENCY_FE_NAME_TO_ID, EMERGENCY_FE_ID_TA_NAME } from '../shared/models/emergency';
import { EventService } from '../shared/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  constructor( private ngbDateParserFormatter: NgbDateParserFormatter,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }
    isExistedEvent: boolean = false;

  newMarker: Marker;
  currentEvent: Event;
  latitude: number;
  longitude: number;
  zoom: number;
  currentEventDate: NgbDate;
  emergencyType: string;
  selectedFiles: {name: string, data: string}[] = []

  ngOnInit() {
    this.newMarker = new Marker();
    this.newMarker = { lat: 0, lng: 0,name: "", address: "", desc: "", eventId: null };
    this.currentEvent = new Event();

    // this.currentEventDate = new Date('2020');
    // console.log(this.currentEventDate.toISOString(), this.currentEventDate)
    this.latitude = 49.045639;
    this.longitude = 31.159608;
    this.zoom = 5.2;
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      if(window.history.state.existedEvent){
        this.setCurrentEvent(window.history.state.existedEvent);
        this.isExistedEvent = true
      }

      this.currentEvent.imageByteArrayList = this.currentEvent.imageByteArrayList || [];
    
  }

  setCurrentEvent(event: Event){
    this.currentEvent = event;
    let date = new Date(event.date)
    this.currentEventDate = new NgbDate(date.getFullYear(), date.getMonth(), date.getDay());
    this.newMarker = <Marker>{ lat: event.eventPosition.x, lng: event.eventPosition.y, name: event.eventName, address: event.eventPosition.place, desc: event.description, eventId: event.eventId }
    this.emergencyType = EMERGENCY_FE_ID_TA_NAME.get(event.emergencyId).toLowerCase()
  }

  addMarker(lat: number, lng: number) {
    this.newMarker.lat = lat;
    this.newMarker.lng = lng;
    console.log(this.newMarker)
  }

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(event)
    this.onUpload()
  }

  onUpload() {
    console.log(this.selectedFile)

    var reader = new FileReader();
    let thiss = this
    reader.onload = function () {
      console.log(reader.result);
      thiss.selectedFiles.push({name: thiss.selectedFile.name, data: <string> reader.result})
    }

    reader.readAsDataURL(this.selectedFile);
  }
  removeSelectedFile(file){
    const index = this.selectedFiles.indexOf(file);
    if(index > -1){
      this.selectedFiles.splice(index, 1);
    }
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
    this.currentEvent.imageByteArrayList = this.selectedFiles.map(file => file.data)
    console.log(this.currentEvent.imageByteArrayList)
    this.currentEvent.emergency = null;

    this.eventService.modifyEvent(this.currentEvent, this.isExistedEvent);
    // this.router.navigate(["/map"])
  }
}
