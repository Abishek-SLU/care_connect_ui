import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    AppointmentsComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule
  ]
})
export class AppointmentsModule { }
