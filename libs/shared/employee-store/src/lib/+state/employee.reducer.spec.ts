import { Action } from '@ngrx/store';

import * as EmployeeActions from './employee.actions';
import { EmployeeEntity } from './employee.models';
import { State, initialState, reducer } from './employee.reducer';

describe('Employee Reducer', () => {
  const createEmployeeEntity = (id: string, name = ''): EmployeeEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Employee actions', () => {
    it('loadEmployeeSuccess should return the list of known Employee', () => {
      const employee = [
        createEmployeeEntity('PRODUCT-AAA'),
        createEmployeeEntity('PRODUCT-zzz'),
      ];
      const action = EmployeeActions.loadEmployeeSuccess({ employee });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
