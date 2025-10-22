import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerticalFormsRoutingModule } from './vertical-forms-routing.module';
import { VerticalFormsComponent } from './vertical-forms.component';


@NgModule({
  declarations: [
    VerticalFormsComponent
  ],
  imports: [
    CommonModule,
    VerticalFormsRoutingModule
  ]
})
export class VerticalFormsModule { }
