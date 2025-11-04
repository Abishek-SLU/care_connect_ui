import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleTimingComponent } from './schedule-timing.component';
import { AdminGuard } from 'src/app/core/service/service.index';

const routes: Routes = [{ path: '', component: ScheduleTimingComponent, canActivate: [AdminGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleTimingRoutingModule { }
