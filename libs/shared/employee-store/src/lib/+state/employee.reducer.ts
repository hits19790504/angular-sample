import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as EmployeeActions from './employee.actions';
import { EmployeeEntity } from './employee.models';

export const EMPLOYEE_FEATURE_KEY = 'employee';

export interface State extends EntityState<EmployeeEntity> {
  selectedId?: string | number; // which Employee record has been selected
  loaded: boolean; // has the Employee list been loaded
  error?: string | null; // last known error (if any)
}

export interface EmployeePartialState {
  readonly [EMPLOYEE_FEATURE_KEY]: State;
}

export const employeeAdapter: EntityAdapter<EmployeeEntity> =
  createEntityAdapter<EmployeeEntity>();

export const initialState: State = employeeAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(EmployeeActions.loadEmployeeSuccess, (state, { employee }) =>
    employeeAdapter.setAll(employee, { ...state, loaded: true })
  ),
  on(EmployeeActions.loadEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return employeeReducer(state, action);
}
