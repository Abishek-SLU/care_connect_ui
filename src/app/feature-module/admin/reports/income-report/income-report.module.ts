import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeReportRoutingModule } from './income-report-routing.module';
import { IncomeReportComponent } from './income-report.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    IncomeReportComponent
  ],
  imports: [
    CommonModule,
    IncomeReportRoutingModule,
    SharedModule
  ]
})
export class IncomeReportModule { }
