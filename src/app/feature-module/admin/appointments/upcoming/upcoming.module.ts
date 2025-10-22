import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpcomingRoutingModule } from './upcoming-routing.module';
import { UpcomingComponent } from './upcoming.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    UpcomingComponent
  ],
  imports: [
    CommonModule,
    UpcomingRoutingModule,
    SharedModule
  ]
})
export class UpcomingModule { }
