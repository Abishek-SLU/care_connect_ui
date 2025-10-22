import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorBlogComponent } from './doctor-blog.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorBlogComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorBlogRoutingModule {}
