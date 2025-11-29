import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalRecordsComponent } from './medical-records.component';
import { AdminGuard } from 'src/app/core/service/service.index';

const routes: Routes = [{ path: '', component: MedicalRecordsComponent, canActivate: [AdminGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalRecordsRoutingModule { }
