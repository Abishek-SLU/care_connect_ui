import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsListRoutingModule } from './patients-list-routing.module';
import { PatientsListComponent } from './patients-list.component';


@NgModule({
  declarations: [
    PatientsListComponent
  ],
  imports: [
    CommonModule,
    PatientsListRoutingModule
  ]
})
export class PatientsListModule { }
