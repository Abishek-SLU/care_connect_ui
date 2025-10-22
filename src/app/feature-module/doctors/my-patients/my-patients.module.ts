import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPatientsRoutingModule } from './my-patients-routing.module';
import { MyPatientsComponent } from './my-patients.component';


@NgModule({
  declarations: [
    MyPatientsComponent
  ],
  imports: [
    CommonModule,
    MyPatientsRoutingModule
  ]
})
export class MyPatientsModule { }
