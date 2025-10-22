import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PastRoutingModule } from './past-routing.module';
import { PastComponent } from './past.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    PastComponent
  ],
  imports: [
    CommonModule,
    PastRoutingModule,
    SharedModule
  ]
})
export class PastModule { }
