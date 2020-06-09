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
  selector: 'app-calc-loss',
  templateUrl: './calc-loss.component.html',
  styleUrls: ['./calc-loss.component.scss']
})
export class CalcLossComponent implements OnInit {

  lifeAndHealth: {
  Nml: number;
  Nmt: number;
  Nmi: number;
  Nmz60: number;
  Nmz16: number;
  Nmdp: number;
  AvgVD: number;
  Nmvtg: number;
  } = {
    Nml: null,
    Nmt: null,
    Nmi: null,
    Nmz60: null,
    Nmz16: null,
    Nmdp: null,
    AvgVD: null,
    Nmvtg: null
  }

  lifeAndHealthRes: {
    Hr: number;
    Vtrr: number;
    Vdp: number;
    Vvtg: number;
  } = {
    Hr: 0,
    Vtrr: null,
    Vdp: null,
    Vvtg: null
  }

  destruction: {
    Fv: number;
    Fg: number;
    Pr: number;
    Prs: number;
    Sn: number;
    Mdg: number;
  } = {
    Fv: null,
    Fg: null,
    Pr: null,
    Prs: null,
    Sn: null,
    Mdg: null
  }

  destructionRes: number = 0;
  overallRes: number;

  constructor() { }


  ngOnInit() {
    // this.lifeAndHealth = {};
    // Object.keys(this.lifeAndHealth).forEach(v => this.lifeAndHealth[v] = 0);
  }


  onSubmited() {
    this.lifeAndHealthRes.Vtrr = + (this.lifeAndHealth.Nml || 0) * 0.28 + (this.lifeAndHealth.Nmt||0) * 6.5 + (this.lifeAndHealth.Nmi||0) * 37 + (this.lifeAndHealth.Nmz16||0) * 22 + (this.lifeAndHealth.Nmz60||0) * 47;
    
    this.lifeAndHealthRes.Vdp = +(this.lifeAndHealth.Nmdp||0) * 0.15;
    this.lifeAndHealthRes.Vvtg = 12 * 0.037 * (18 - (this.lifeAndHealth.AvgVD||0)) * (this.lifeAndHealth.Nmvtg||0);
    this.lifeAndHealthRes.Hr = + (this.lifeAndHealthRes.Vtrr||0) + (this.lifeAndHealthRes.Vdp||0) + (this.lifeAndHealthRes.Vvtg||0);
    console.log(this.lifeAndHealth)
    this.destructionRes = 0;
    Object.keys(this.destruction).forEach(v => this.destructionRes += +(this.destruction[v] || 0));

    this.overallRes = +this.destructionRes + this.lifeAndHealthRes.Hr;
  }
}
