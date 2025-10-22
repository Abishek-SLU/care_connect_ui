import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPatientsComponent } from './my-patients.component';

const routes: Routes = [
  {
    path: '',
    component: MyPatientsComponent,
    children: [
      {
        path: 'patients-list',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListModule),
      },
      {
        path: 'patients-profile',
        loadChildren: () =>
          import('./view/view.module').then((m) => m.ViewModule),
      },
      {
        path: 'add-prescription',
        loadChildren: () =>
          import('./add-prescription/add-prescription.module').then(
            (m) => m.AddPrescriptionModule
          ),
      },
      {
        path: 'edit-prescription',
        loadChildren: () =>
          import('./edit-prescription/edit-prescription.module').then(
            (m) => m.EditPrescriptionModule
          ),
      },
      {
        path: 'add-billing',
        loadChildren: () =>
          import('./add-billing/add-billing.module').then(
            (m) => m.AddBillingModule
          ),
      },
      {
        path: 'edit-billing',
        loadChildren: () =>
          import('./edit-billing/edit-billing.module').then(
            (m) => m.EditBillingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPatientsRoutingModule {}
