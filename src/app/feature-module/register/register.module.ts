import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { HomeOneModule } from '../home/home-one/home-one.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, HomeOneModule, SharedModule, ReactiveFormsModule, FormsModule],
})
export class RegisterModule { }
