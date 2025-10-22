import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientChatRoutingModule } from './patient-chat-routing.module';
import { PatientChatComponent } from './patient-chat.component';


@NgModule({
  declarations: [
    PatientChatComponent
  ],
  imports: [
    CommonModule,
    PatientChatRoutingModule
  ]
})
export class PatientChatModule { }
