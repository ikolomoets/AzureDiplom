import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';
import { EmergencyService } from 'src/app/shared/services/emergency.service';
import { Observable } from 'rxjs';
import { SelectorsService } from 'src/app/shared/services/selectors.service';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss']
})
export class TablesPageComponent implements OnInit {

  constructor( private eventService: EventService,
    private emergencyService: EmergencyService, 
    private selectorsService: SelectorsService) { }

events$: Observable<any>;

  statistic$: Observable<any>
  ngOnInit() {
    this.statistic$ = this.emergencyService.getEmergenciesStatistic()
  }

  show(date){
    console.log(date)
  }

}
