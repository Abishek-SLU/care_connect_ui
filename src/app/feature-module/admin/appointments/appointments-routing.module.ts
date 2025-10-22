import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsComponent,
    children: [
      {
        path: 'upcoming',
        loadChildren: () =>
          import('./upcoming/upcoming.module').then((m) => m.UpcomingModule),
      },
      {
        path: 'past',
        loadChildren: () =>
          import('./past/past.module').then((m) => m.PastModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {}
