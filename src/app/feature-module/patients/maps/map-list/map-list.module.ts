import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapListRoutingModule } from './map-list-routing.module';
import { MapListComponent } from './map-list.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from 'src/app/shared/module/shared.module';

@NgModule({
  declarations: [
    MapListComponent
  ],
  imports: [
    CommonModule,
    MapListRoutingModule,
    GoogleMapsModule,
    SharedModule
  ]
})
export class MapListModule { }
