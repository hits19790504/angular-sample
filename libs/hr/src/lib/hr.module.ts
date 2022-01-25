import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: 'employees',
        pathMatch: 'full',
        loadChildren: () =>
          import('@angular-sample/hr').then((m) => m.EmployeesModule),
      },
    ]),
  ],
})
export class HrModule {}
