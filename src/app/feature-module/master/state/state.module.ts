import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateRoutingModule } from './state-routing.module';
import { StateComponent } from './state.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    StateComponent
  ],
  imports: [
    CommonModule,
    StateRoutingModule,FormsModule,ReactiveFormsModule,NgSelectModule,NgxSpinnerModule
  ]
})
export class StateModule { }
