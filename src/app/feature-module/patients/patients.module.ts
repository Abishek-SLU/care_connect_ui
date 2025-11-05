import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { HomeOneModule } from '../home/home-one/home-one.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PatientsComponent, SidebarComponent],
  imports: [CommonModule, PatientsRoutingModule, HomeOneModule,SharedModule,HttpClientModule],
})
export class PatientsModule {}
