import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchDoctorRoutingModule } from './search-doctor-routing.module';
import { SearchDoctorComponent } from './search-doctor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SearchDoctorComponent
  ],
  imports: [
    CommonModule,
    SearchDoctorRoutingModule,
    NgbModule,
    HttpClientModule
  ]
})
export class SearchDoctorModule { }
