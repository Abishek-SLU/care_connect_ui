import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    children: [
      {
        path: 'view',
        loadChildren: () =>
          import('./view/view.module').then((m) => m.ViewModule),
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
