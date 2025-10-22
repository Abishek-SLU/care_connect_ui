import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then((m) => m.RegisterModule),
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('./forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          ),
      },
      {
        path: 'lock-screen',
        loadChildren: () =>
          import('./lock-screen/lock-screen.module').then(
            (m) => m.LockScreenModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
