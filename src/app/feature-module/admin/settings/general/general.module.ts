import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    GeneralComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    SharedModule
  ]
})
export class GeneralModule { }
