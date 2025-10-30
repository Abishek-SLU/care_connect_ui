import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminGuard } from 'src/app/core/service/service.index';
import { ViewPatientsProfileModule } from '../view-patients-profile/view-patients-profile.module';
import { ViewPatientsProfileComponent } from '../view-patients-profile/view-patients-profile.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,canActivate:[AdminGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
