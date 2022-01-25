import { Component, OnInit } from '@angular/core';
import { EmployeeFacade } from '@angular-sample/shared/employee-store';

@Component({
  selector: 'angular-sample-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
})
export class EmployeesPageComponent implements OnInit {
  employeeList$ = this.employeeFacade.allEmployee$;
  loaded$ = this.employeeFacade.loaded$;

  constructor(private readonly employeeFacade: EmployeeFacade) {}

  ngOnInit(): void {
    this.employeeFacade.init();
  }
}
