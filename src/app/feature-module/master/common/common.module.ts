import { NgModule } from '@angular/core';

import { CommonRoutingModule } from './common-routing.module';
import { CommonComponent } from './common.component';
import { HomeOneModule } from '../../home/home-one/home-one.module';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    CommonComponent,
  ],
  imports: [CommonRoutingModule,HomeOneModule,SharedModule]
})
export class CommonModule { }
