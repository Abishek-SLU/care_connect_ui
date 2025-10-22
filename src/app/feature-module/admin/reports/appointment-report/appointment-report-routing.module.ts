import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentReportComponent } from './appointment-report.component';

const routes: Routes = [{ path: '', component: AppointmentReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentReportRoutingModule { }
