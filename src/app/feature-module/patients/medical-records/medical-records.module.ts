import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalRecordsRoutingModule } from './medical-records-routing.module';
import { MedicalRecordsComponent } from './medical-records.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    MedicalRecordsComponent
  ],
  imports: [
    CommonModule,
    MedicalRecordsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    NgxSpinnerModule
  ]
})
export class MedicalRecordsModule { }