import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageScheduleComponent } from './manage-schedule.component';
import { AdminGuard } from 'src/app/core/service/service.index';

const routes: Routes =[{ path: '', component: ManageScheduleComponent,canActivate:[AdminGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageScheduleRoutingModule { }
