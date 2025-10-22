import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { AdminSideBarComponent } from './components/admin-side-bar/admin-side-bar.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminSideBarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
