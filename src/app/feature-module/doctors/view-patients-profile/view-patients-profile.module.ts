import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPatientsProfileRoutingModule } from './view-patients-profile-routing.module';
import { ViewPatientsProfileComponent } from './view-patients-profile.component';


@NgModule({
  declarations: [
    ViewPatientsProfileComponent
  ],
  imports: [
    CommonModule,
    ViewPatientsProfileRoutingModule
  ]
})
export class ViewPatientsProfileModule { }
