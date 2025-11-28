import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPrescriptionRoutingModule } from './add-prescription-routing.module';
import { AddPrescriptionComponent } from './add-prescription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AddPrescriptionComponent
  ],
  imports: [
    CommonModule,
    AddPrescriptionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxSpinnerModule

  ]
})
export class AddPrescriptionModule { }
