import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageScheduleRoutingModule } from './manage-schedule-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ManageScheduleRoutingModule,
    SharedModule,
    NgxSpinnerModule,
  ]
})
export class ManageScheduleModule { }
