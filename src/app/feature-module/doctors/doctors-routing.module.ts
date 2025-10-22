import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'schedule-timing',
        loadChildren: () =>
          import('./schedule-timing/schedule-timing.module').then(
            (m) => m.ScheduleTimingModule
          ),
      },
      {
        path: 'patients-list',
        loadChildren: () =>
          import('./patients-list/patients-list.module').then(
            (m) => m.PatientsListModule
          ),
      },
      {
        path: 'patients-profile',
        loadChildren: () =>
          import('./view-patients-profile/view-patients-profile.module').then(
            (m) => m.ViewPatientsProfileModule
          ),
      },
      {
        path: 'message',
        loadChildren: () =>
          import('./message/message.module').then((m) => m.MessageModule),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./invoice/invoice.module').then((m) => m.InvoiceModule),
      },
      {
        path: 'profile-settings',
        loadChildren: () =>
          import('./profile-settings/profile-settings.module').then(
            (m) => m.ProfileSettingsModule
          ),
      },
      {
        path: 'reviews',
        loadChildren: () =>
          import('./reviews/reviews.module').then((m) => m.ReviewsModule),
      },
      {
        path: 'doctor-register',
        loadChildren: () =>
          import('./doctor-register/doctor-register.module').then(
            (m) => m.DoctorRegisterModule
          ),
      },
      {
        path: 'doctor-blog',
        loadChildren: () =>
          import('./doctor-blog/doctor-blog.module').then(
            (m) => m.DoctorBlogModule
          ),
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./my-patients/my-patients.module').then(
            (m) => m.MyPatientsModule
          ),
      },
      {
        path: 'available-timings',
        loadChildren: () =>
          import('./available-timings/available-timings.module').then(
            (m) => m.AvailableTimingsModule
          ),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./accounts/accounts.module').then((m) => m.AccountsModule),
      },
      {
        path: 'social-media',
        loadChildren: () =>
          import('./social-media/social-media.module').then(
            (m) => m.SocialMediaModule
          ),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
