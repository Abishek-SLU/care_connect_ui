import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PastComponent } from './past.component';

const routes: Routes = [{ path: '', component: PastComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PastRoutingModule { }
