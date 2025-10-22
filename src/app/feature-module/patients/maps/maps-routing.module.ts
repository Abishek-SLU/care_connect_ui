import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsComponent } from './maps.component';

const routes: Routes = [
  {
    path: '',
    component: MapsComponent,
    children: [
      {
        path: 'map-list',
        loadChildren: () =>
          import('./map-list/map-list.module').then((m) => m.MapListModule),
      },
      {
        path: 'map-grid',
        loadChildren: () =>
          import('./map-grid/map-grid.module').then((m) => m.MapGridModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule {}
