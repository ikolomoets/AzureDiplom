import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesPageComponent } from './tables-page/tables-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TablesPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: TablesPageComponent },
    ])
  ],
  exports: [TablesPageComponent]
})
export class TablesModule { }
