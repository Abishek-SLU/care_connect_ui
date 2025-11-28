import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPrescriptionRoutingModule } from './edit-prescription-routing.module';
import { EditPrescriptionComponent } from './edit-prescription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    EditPrescriptionComponent
  ],
  imports: [
    CommonModule,
    EditPrescriptionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class EditPrescriptionModule { }
