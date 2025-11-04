import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleTimingRoutingModule } from './schedule-timing-routing.module';
import { ScheduleTimingComponent } from './schedule-timing.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    ScheduleTimingComponent
  ],
  imports: [
    CommonModule,
    ScheduleTimingRoutingModule,
    SharedModule,
    NgbModule,
    // NgxSpinnerModule
  ]
})
export class ScheduleTimingModule { }
