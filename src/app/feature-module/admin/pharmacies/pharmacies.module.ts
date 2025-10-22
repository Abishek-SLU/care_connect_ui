import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmaciesRoutingModule } from './pharmacies-routing.module';
import { PharmaciesComponent } from './pharmacies.component';


@NgModule({
  declarations: [
    PharmaciesComponent
  ],
  imports: [
    CommonModule,
    PharmaciesRoutingModule
  ]
})
export class PharmaciesModule { }
