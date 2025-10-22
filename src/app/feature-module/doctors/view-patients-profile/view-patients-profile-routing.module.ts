import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPatientsProfileComponent } from './view-patients-profile.component';

const routes: Routes = [{ path: '', component: ViewPatientsProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPatientsProfileRoutingModule { }
