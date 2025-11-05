import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonComponent } from './common.component';

const routes: Routes = [{
  path: '', component: CommonComponent,
  children: [
    {
      path: 'country',
      loadChildren: () =>
        import('../country/country.module').then(
          (m) => m.CountryModule
        ),
    },
    {
      path: 'state',
      loadChildren: () =>
        import('../state/state.module').then(
          (m) => m.StateModule
        ),
    },
    {
      path: 'district',
      loadChildren: () =>
        import('../district/district.module').then(
          (m) => m.DistrictModule
        ),
    },
    {
      path: 'bloodGroup',
      loadChildren: () =>
        import('../blood-group/blood-group.module').then(
          (m) => m.BloodGroupModule
        ),
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule { }
