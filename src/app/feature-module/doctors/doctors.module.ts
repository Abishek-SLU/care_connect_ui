import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ManageScheduleComponent } from './manage-schedule/manage-schedule.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { HomeOneModule } from '../home/home-one/home-one.module';

@NgModule({
  declarations: [
    DoctorsComponent,
    SidebarComponent,
    ManageScheduleComponent,   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,       
    DoctorsRoutingModule,
    HomeOneModule,
    SharedModule,
  ],
  exports: [SidebarComponent],
})
export class DoctorsModule { }