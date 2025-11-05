import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRecordsRoutingModule } from './medical-records-routing.module';
import { MedicalRecordsComponent } from './medical-records.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MedicalRecordsComponent
  ],
  imports: [
    CommonModule,
    MedicalRecordsRoutingModule,
    HttpClientModule
  ]
})
export class MedicalRecordsModule { }
