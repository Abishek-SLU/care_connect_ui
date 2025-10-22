import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'active',
        loadChildren: () =>
          import('./active/active.module').then((m) => m.ActiveModule),
      },
      {
        path: 'pending',
        loadChildren: () =>
          import('./pending/pending.module').then((m) => m.PendingModule),
      },
      {
        path: 'add',
        loadChildren: () => import('./add/add.module').then((m) => m.AddModule),
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./edit/edit.module').then((m) => m.EditModule),
      },
      {
        path: 'details',
        loadChildren: () =>
          import('./details/details.module').then((m) => m.DetailsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
