import { Component, Input } from '@angular/core';

@Component({
  selector: 'angular-sample-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
  @Input() employeeList?: { id: string; name: string }[] | null;
}
