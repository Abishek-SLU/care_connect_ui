import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictRoutingModule } from './district-routing.module';
import { DistrictComponent } from './district.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    DistrictComponent
  ],
  imports: [
    CommonModule,
    DistrictRoutingModule,FormsModule,ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class DistrictModule { }
