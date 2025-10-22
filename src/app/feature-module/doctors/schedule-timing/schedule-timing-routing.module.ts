import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleTimingComponent } from './schedule-timing.component';

const routes: Routes = [{ path: '', component: ScheduleTimingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleTimingRoutingModule { }
