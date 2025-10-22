import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersReportRoutingModule } from './users-report-routing.module';
import { UsersReportComponent } from './users-report.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    UsersReportComponent
  ],
  imports: [
    CommonModule,
    UsersReportRoutingModule,
    SharedModule
  ]
})
export class UsersReportModule { }
