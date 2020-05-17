import { Component, OnInit, Input } from '@angular/core';
import { Marker } from '../shared/models/Marker';
import { EventService } from '../shared/services/event.service';
import { Event } from '../shared/models/event';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit {

  constructor( private eventService: EventService) { }
  latitude: number;
  longitude: number;
  zoom: number;
  markers: Marker[];
  currentMarker: Marker;
  
events$: Observable<any>;
@Input()
  ngOnInit() {
    this.markers = [];
    this.setInit();
    

  }

  // Get Current Location Coordinates
  private setInit() {
    this.latitude = 49.045639;
    this.longitude = 31.159608;
    this.zoom = 6;
    this.setInitMarkers();

  }

  private setInitMarkers() {
      this.eventService.events.subscribe(events=> {
        this.markers = events.map((event) => { return  <Marker>{lat: event.eventPosition.x, lng: event.eventPosition.y, name: event.eventName, address: event.eventPosition.place, desc: event.description}});
        console.log(this.markers, events)
      });

  //   this.markers
  //     .push({ lat: 49.150875, lng: 35.704503, address: "some", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  //       { lat: 51.233786, lng: 29.072268, address: "HISTORY, PURPOSE AND USAGE", desc: "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content." },
  //       { lat: 51.233786, lng: 28.072378, address: "HISTORY, PURPOSE AND USAGE", desc: "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content." },
  //       { lat: 48.816019, lng: 28.340754, address: "HEDONIST ROOTS", desc: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”" },
  //       { lat: 51.816019, lng: 32.340754, address: "HEDONIST ROOTS", desc: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”" },
  //       { lat: 50.289822, lng: 34.286719, address: "REMIXING A CLASSIC", desc: "So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book." });
  }

  selectMarker(marker: Marker) {
    this.currentMarker = marker
  }

  slides = [
    { img: "assets/images/911e2ef3-874e-4cc9-8421-9b64ec16d8f2.png" },
    { img: "assets/images/421f7538-d3d7-43e0-baad-6c868a90a62a.png" },
    { img: "assets/images/ea7303da-9835-11ea-bb37-0242ac130002.png" },
    { img: "assets/images/f54c19a4-9835-11ea-bb37-0242ac130002.png" },
    { img: "assets/images/01157c80-9836-11ea-bb37-0242ac130002.png" },
    { img: "assets/images/09ac9dc4-9836-11ea-bb37-0242ac130002.png" },
    { img: "assets/images/23e2161a-9836-11ea-bb37-0242ac130002.png" },
    { img: "assets/images/25a4f9c2-9836-11ea-bb37-0242ac130002.png" },
    { img: "assets/images/3099b250-9836-11ea-bb37-0242ac130002.png" },
    { img: "assets/images/457866ee-9836-11ea-bb37-0242ac130002.png" },
    { img: "assets/images/ea7303da-9835-11ea-bb37-0242ac130002.png" }
  ];
  slideConfig = {
    slidesToScroll: 3,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1220,
        settings: {
          slidesToScroll: 3,
          slidesToShow: 4
        }
      },
      {
        breakpoint: 980,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 740,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1
        }
      }
    ]
  };

  // addSlide() {
  //   this.slides.push({ img: "http://placehold.it/350x150/777777" })
  // }

  // removeSlide() {
  //   this.slides.length = this.slides.length - 1;
  // }

  // slickInit(e) {
  //   console.log('slick initialized');
  // }

  // breakpoint(e) {
  //   console.log('breakpoint');
  // }

  // afterChange(e) {
  //   console.log('afterChange');
  // }

  // beforeChange(e) {
  //   console.log('beforeChange');
  // }


}
