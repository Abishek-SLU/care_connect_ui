import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientChatRoutingModule } from './patient-chat-routing.module';
import { PatientChatComponent } from './patient-chat.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    PatientChatComponent
  ],
  imports: [
    CommonModule,
    PatientChatRoutingModule,
    HttpClientModule
  ]
})
export class PatientChatModule { }
