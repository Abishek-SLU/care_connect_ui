import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent } from './tables.component';

const routes: Routes = [
  {
    path: '',
    component: TablesComponent,
    children: [
      {
        path: 'basic',
        loadChildren: () =>
          import('./basic/basic.module').then((m) => m.BasicModule),
      },
      {
        path: 'data-table',
        loadChildren: () =>
          import('./data-table/data-table.module').then(
            (m) => m.DataTableModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule {}
