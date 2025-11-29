import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalDetailsComponent } from './medical-details.component';
import { AdminGuard } from 'src/app/core/service/service.index';

const routes: Routes = [{ path: '', component: MedicalDetailsComponent, canActivate: [AdminGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalDetailsRoutingModule { }
