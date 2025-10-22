import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogDetailsRoutingModule } from './blog-details-routing.module';
import { BlogDetailsComponent } from './blog-details.component';


@NgModule({
  declarations: [
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    BlogDetailsRoutingModule,
    FormsModule
  ]
})
export class BlogDetailsModule { }
