import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsListRoutingModule } from './patients-list-routing.module';
import { PatientsListComponent } from './patients-list.component';
import { NgbModalModule, NgbModule, NgbNav, NgbNavContent } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    PatientsListComponent
  ],
  imports: [
    CommonModule,
    PatientsListRoutingModule,
    NgbModule,
    NgbModalModule,
    NgxSpinnerModule
  ]
})
export class PatientsListModule { }
