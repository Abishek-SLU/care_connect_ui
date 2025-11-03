import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    CountryComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CountryRoutingModule,
    NgxSpinnerModule
   
  ]
})
export class CountryModule { }
