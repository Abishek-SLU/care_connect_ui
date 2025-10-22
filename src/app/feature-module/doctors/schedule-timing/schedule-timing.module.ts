import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleTimingRoutingModule } from './schedule-timing-routing.module';
import { ScheduleTimingComponent } from './schedule-timing.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    ScheduleTimingComponent
  ],
  imports: [
    CommonModule,
    ScheduleTimingRoutingModule,
    SharedModule
  ]
})
export class ScheduleTimingModule { }
