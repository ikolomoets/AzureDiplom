import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { EventService } from '../shared/services/event.service';
import { SelectorsService } from '../shared/services/selectors.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  status: boolean;
  subscription: Subscription;
  _isMapShown: boolean = false;
  _isTablesShown: boolean = false;

  constructor(private userService: UserService,
    private router: Router,
    private eventService: EventService, 
    private selectorsService: SelectorsService) {
  }

  logout() {
    this.userService.logout();
  }

  ngOnInit() {
    let url = window.location.pathname;
    console.log(url)
    if (url == "/tables") this._shooseTables();
    else if (url == "/map" || url == "/") this._shooseMap();
    else {
      this._isMapShown = false;
      this._isTablesShown = false;
    }
    this.subscription = this.userService.authNavStatus$.subscribe(status => console.log(status));

  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
  _shooseMap() {
    this._isMapShown = true;
    this._isTablesShown = false;
    this.router.navigate(['/map']);

  }

  _shooseTables() {
    this._isTablesShown = true;
    this._isMapShown = false;
    this.router.navigate(['/tables']);
  }


}
