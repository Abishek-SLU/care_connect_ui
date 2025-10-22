import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeOneRoutingModule } from './home-one-routing.module';
import { HomeOneComponent } from './home-one.component';
import { HomeOneFooterComponent } from './components/home-one-footer/home-one-footer.component';
import { HomeOneHeaderComponent } from './components/home-one-header/home-one-header.component';
import { SharedModule } from 'src/app/shared/module/shared.module';

@NgModule({
  declarations: [
    HomeOneComponent,
    HomeOneFooterComponent,
    HomeOneHeaderComponent,
  ],
  imports: [CommonModule, HomeOneRoutingModule, SharedModule],
  exports: [HomeOneFooterComponent,
    HomeOneHeaderComponent,]
})
export class HomeOneModule { }
