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
  selector: 'app-calc-loss-fire',
  templateUrl: './calc-loss_fire.component.html',
  styleUrls: ['./calc-loss_fire.component.scss']
})
export class CalcLossFireComponent implements OnInit {

  inputParams: {
    P: number;
    obl: number;
    groupBefore: number;
    groupAfter: number;
    koefProd: number;
    koefLostProd: number;
  } = {
    P: null,
    obl: null,
    groupBefore: null,
    groupAfter: null,
    koefProd: null,
    koefLostProd: null
  }

  result: {
    Plr1: number;
    Plr2: number;
    Plr3: number;
    Plr: number;
  } = {
    Plr1: 0,
    Plr2: 0,
    Plr3: 0,
    Plr: 0
  }


  constructor() { }


  ngOnInit() {
    // this.lifeAndHealth = {};
    // Object.keys(this.lifeAndHealth).forEach(v => this.lifeAndHealth[v] = 0);
  }


  onSubmited() {
console.log(this.inputParams)

    this.result.Plr1 = this.getNormatives(this.inputParams.obl, this.inputParams.groupBefore) * this.inputParams.koefProd * this.inputParams.P;
    this.result.Plr2 = (1 - this.inputParams.koefLostProd) * this.getNormatives(this.inputParams.obl, this.inputParams.groupBefore)  * this.inputParams.P;
    this.result.Plr3 = (this.getNormatives(this.inputParams.obl, this.inputParams.groupBefore) - this.getNormatives(this.inputParams.obl, this.inputParams.groupAfter)) * this.inputParams.koefProd * this.inputParams.P;
    this.result.Plr = this.result.Plr1 + this.result.Plr2 + this.result.Plr3;
    console.log(this.getNormatives(27, 1))
  }

  getNormatives( i: number, j: number): number{
    let normatives: number[][] = 
    [[84.7,	50.2], 
      [77.7,	46], 
      [145	, 0], 
      [163	, 0], 
      [75,	44.4], 
      [29.8,	17.9], 
      [123.1,	123.1], 
      [250.9, 0], 
      [31.9,	19.9], 
      [123.1,	123.1], 
      [80.5,	47.7], 
      [159.1,	94.3], 
      [118.6, 0	], 
      [70.1,	41.6], 
      [123.1,	123.1], 
      [241.6, 0	], 
      [141.8,	0], 
      [135, 0	], 
      [74.1,	43.9], 
      [19.6,	47.1], 
      [100.4,	59.5], 
      [91.9, 0	], 
      [167.3, 0	], 
      [93.2,	55.2], 
      [75.8,	44.9], 
      [31.1,	18.7], 
      [123.1,	123.1], 
      [75,	44.4]]
      
return normatives[i][j]
  }
}
