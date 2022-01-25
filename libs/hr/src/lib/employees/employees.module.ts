import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesPageComponent } from './containers/employees-page/employees-page.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';


@NgModule({
  declarations: [
    EmployeesPageComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
