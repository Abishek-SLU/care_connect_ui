import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPagesComponent } from './error-pages.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorPagesComponent,
    children: [
      {
        path: '404',
        loadChildren: () =>
          import('./error404/error404.module').then((m) => m.Error404Module),
      },
      {
        path: '505',
        loadChildren: () =>
          import('./error505/error505.module').then((m) => m.Error505Module),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPagesRoutingModule {}
