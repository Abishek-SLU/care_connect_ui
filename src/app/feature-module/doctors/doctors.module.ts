import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { HomeOneModule } from '../home/home-one/home-one.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [DoctorsComponent, SidebarComponent],
  imports: [CommonModule, DoctorsRoutingModule, HomeOneModule,SharedModule],
  exports: [SidebarComponent]
})
export class DoctorsModule {}
