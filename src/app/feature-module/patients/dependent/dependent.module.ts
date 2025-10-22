import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DependentRoutingModule } from './dependent-routing.module';
import { DependentComponent } from './dependent.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DependentComponent
  ],
  imports: [
    CommonModule,
    DependentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DependentModule { }
