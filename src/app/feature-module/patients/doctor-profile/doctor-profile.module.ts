import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorProfileRoutingModule } from './doctor-profile-routing.module';
import { DoctorProfileComponent } from './doctor-profile.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DoctorProfileComponent
  ],
  imports: [
    CommonModule,
    DoctorProfileRoutingModule,
    HttpClientModule
  ]
})
export class DoctorProfileModule { }
