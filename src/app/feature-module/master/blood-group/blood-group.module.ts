import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodGroupRoutingModule } from './blood-group-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BloodGroupComponent } from './blood-group.component';


@NgModule({
  declarations: [
BloodGroupComponent
  ],
  imports: [
    CommonModule,
    BloodGroupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class BloodGroupModule { }
