import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapGridRoutingModule } from './map-grid-routing.module';
import { MapGridComponent } from './map-grid.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from 'src/app/shared/module/shared.module';

@NgModule({
  declarations: [
    MapGridComponent
  ],
  imports: [
    CommonModule,
    MapGridRoutingModule,
    GoogleMapsModule,
    SharedModule
  ]
})
export class MapGridModule { }
