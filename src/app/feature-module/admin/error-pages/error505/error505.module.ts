import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error505RoutingModule } from './error505-routing.module';
import { Error505Component } from './error505.component';


@NgModule({
  declarations: [
    Error505Component
  ],
  imports: [
    CommonModule,
    Error505RoutingModule
  ]
})
export class Error505Module { }
