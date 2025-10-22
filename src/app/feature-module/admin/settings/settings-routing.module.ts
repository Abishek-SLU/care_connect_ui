import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'general',
        loadChildren: () =>
          import('./general/general.module').then((m) => m.GeneralModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'preference',
        loadChildren: () =>
          import('./preference/preference.module').then(
            (m) => m.PreferenceModule
          ),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: 'email',
        loadChildren: () =>
          import('./email/email.module').then((m) => m.EmailModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
