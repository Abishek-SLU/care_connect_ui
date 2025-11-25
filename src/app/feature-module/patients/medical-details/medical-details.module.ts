import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalDetailsRoutingModule } from './medical-details-routing.module';
import { MedicalDetailsComponent } from './medical-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MedicalDetailsComponent
  ],
  imports: [
    CommonModule,
    MedicalDetailsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class MedicalDetailsModule { }
