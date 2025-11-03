import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloodGroupComponent } from './blood-group.component';

const routes: Routes = [{path:'',component:BloodGroupComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloodGroupRoutingModule { }
