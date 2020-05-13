import { Component, OnInit } from '@angular/core';
import { Marker } from '../entities/Marker';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  constructor() { }

  newMarker: Marker;

  latitude: number;
  longitude: number;
  zoom: number;

  ngOnInit() {
    this.newMarker = new Marker();
    this.newMarker = { lat: 0, lng: 0, address: "", desc: "" };


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
    console.log(this.newMarker);
  }
}
