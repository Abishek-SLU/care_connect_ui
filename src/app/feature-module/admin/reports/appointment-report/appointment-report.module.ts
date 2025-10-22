import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentReportRoutingModule } from './appointment-report-routing.module';
import { AppointmentReportComponent } from './appointment-report.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    AppointmentReportComponent
  ],
  imports: [
    CommonModule,
    AppointmentReportRoutingModule,
    SharedModule
  ]
})
export class AppointmentReportModule { }
