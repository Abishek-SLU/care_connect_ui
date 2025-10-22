import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { HomeOneModule } from '../home/home-one/home-one.module';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    HomeOneModule,
    SharedModule
  ]
})
export class ForgotPasswordModule { }
