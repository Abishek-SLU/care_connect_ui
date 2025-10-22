import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPrescriptionRoutingModule } from './edit-prescription-routing.module';
import { EditPrescriptionComponent } from './edit-prescription.component';


@NgModule({
  declarations: [
    EditPrescriptionComponent
  ],
  imports: [
    CommonModule,
    EditPrescriptionRoutingModule
  ]
})
export class EditPrescriptionModule { }
