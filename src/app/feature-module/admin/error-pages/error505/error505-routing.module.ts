import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error505Component } from './error505.component';

const routes: Routes = [{ path: '', component: Error505Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Error505RoutingModule { }
