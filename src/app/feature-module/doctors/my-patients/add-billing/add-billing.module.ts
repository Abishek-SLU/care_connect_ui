import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBillingRoutingModule } from './add-billing-routing.module';
import { AddBillingComponent } from './add-billing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddBillingComponent
  ],
  imports: [
    CommonModule,
    AddBillingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddBillingModule { }
