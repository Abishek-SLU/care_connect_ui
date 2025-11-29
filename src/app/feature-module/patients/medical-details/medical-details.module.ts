import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalDetailsRoutingModule } from './medical-details-routing.module';
import { MedicalDetailsComponent } from './medical-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    MedicalDetailsComponent
  ],
  imports: [
    CommonModule,
    MedicalDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    NgxSpinnerModule
  ]
})
export class MedicalDetailsModule { }
