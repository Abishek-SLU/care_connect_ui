import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessRoutingModule } from './success-routing.module';
import { SuccessComponent } from './success.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    SuccessComponent
  ],
  imports: [
    CommonModule,
    SuccessRoutingModule,
    HttpClientModule
  ]
})
export class SuccessModule { }
