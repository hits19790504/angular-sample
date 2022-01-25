import { createAction, props } from '@ngrx/store';
import { EmployeeEntity } from './employee.models';

export const init = createAction('[Employee Page] Init');

export const loadEmployeeSuccess = createAction(
  '[Employee/API] Load Employee Success',
  props<{ employee: EmployeeEntity[] }>()
);

export const loadEmployeeFailure = createAction(
  '[Employee/API] Load Employee Failure',
  props<{ error: any }>()
);
