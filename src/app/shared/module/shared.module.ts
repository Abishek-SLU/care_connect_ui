import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from 'src/app/core/service/service.index';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AutocompleteLibModule,
    SlickCarouselModule,
    CarouselModule,
    NgApexchartsModule,
    NgxDropzoneModule,
    DataTablesModule,
    TagInputModule,
    ToastrModule.forRoot(),
    HttpClientInMemoryWebApiModule.forRoot(DataService)
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AutocompleteLibModule,
    SlickCarouselModule,
    CarouselModule,
    NgApexchartsModule,
    NgxDropzoneModule,
    DataTablesModule,
    TagInputModule
  ],
  providers: [],
})
export class SharedModule {}
