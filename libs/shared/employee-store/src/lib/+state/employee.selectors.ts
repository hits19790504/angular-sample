import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EMPLOYEE_FEATURE_KEY,
  State,
  employeeAdapter,
} from './employee.reducer';

// Lookup the 'Employee' feature state managed by NgRx
export const getEmployeeState =
  createFeatureSelector<State>(EMPLOYEE_FEATURE_KEY);

const { selectAll, selectEntities } = employeeAdapter.getSelectors();

export const getEmployeeLoaded = createSelector(
  getEmployeeState,
  (state: State) => state.loaded
);

export const getEmployeeError = createSelector(
  getEmployeeState,
  (state: State) => state.error
);

export const getAllEmployee = createSelector(getEmployeeState, (state: State) =>
  selectAll(state)
);

export const getEmployeeEntities = createSelector(
  getEmployeeState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getEmployeeState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getEmployeeEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
