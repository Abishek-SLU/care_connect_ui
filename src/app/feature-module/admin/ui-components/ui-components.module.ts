import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiComponentsRoutingModule } from './ui-components-routing.module';
import { UiComponentsComponent } from './ui-components.component';


@NgModule({
  declarations: [
    UiComponentsComponent
  ],
  imports: [
    CommonModule,
    UiComponentsRoutingModule
  ]
})
export class UiComponentsModule { }
