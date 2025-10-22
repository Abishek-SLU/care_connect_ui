import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerticalFormsComponent } from './vertical-forms.component';

const routes: Routes = [{ path: '', component: VerticalFormsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerticalFormsRoutingModule { }
