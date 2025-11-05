import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeOneModule } from '../home/home-one/home-one.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HomeOneModule,
    SharedModule,
    HttpClientModule
  ]
})
export class PagesModule { }
