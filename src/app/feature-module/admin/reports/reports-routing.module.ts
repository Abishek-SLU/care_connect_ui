import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'appointments-report',
        loadChildren: () =>
          import('./appointment-report/appointment-report.module').then(
            (m) => m.AppointmentReportModule
          ),
      },
      {
        path: 'income-report',
        loadChildren: () =>
          import('./income-report/income-report.module').then(
            (m) => m.IncomeReportModule
          ),
      },
      {
        path: 'invoice-report',
        loadChildren: () =>
          import('./invoice-report/invoice-report.module').then(
            (m) => m.InvoiceReportModule
          ),
      },
      {
        path: 'users-report',
        loadChildren: () =>
          import('./users-report/users-report.module').then(
            (m) => m.UsersReportModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
