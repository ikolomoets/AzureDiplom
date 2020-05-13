import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    ViewChild,
    TemplateRef,
    ContentChild,
  } from "@angular/core";
  import { TabLabelComponent } from "./tab-label.component";
  import { TabBodyComponent } from "./tab-body.component";
  
  @Component({
    selector: "app-tab-item",
    template: "<ng-content class='main-block__options-panel_select-btn __year'></ng-content>",
  })
  export class TabItemComponent implements OnInit {
    @Input()
    label: string;
  
    @Input()
    isActive: boolean;
  
    @ContentChild(TabBodyComponent, {static: true})
    bodyComponent: TabBodyComponent;
  
    @ContentChild(TabLabelComponent, {static: true})
    labelComponent: TabLabelComponent;
  
    constructor() {}
  
    ngOnInit(): void {}
  }
  