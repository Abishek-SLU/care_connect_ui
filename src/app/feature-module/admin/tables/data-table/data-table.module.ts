import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableRoutingModule } from './data-table-routing.module';
import { DataTableComponent } from './data-table.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    DataTableRoutingModule,
    SharedModule
  ]
})
export class DataTableModule { }
