import { EmployeeEntity } from './employee.models';
import {
  employeeAdapter,
  EmployeePartialState,
  initialState,
} from './employee.reducer';
import * as EmployeeSelectors from './employee.selectors';

describe('Employee Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEmployeeId = (it: EmployeeEntity) => it.id;
  const createEmployeeEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EmployeeEntity);

  let state: EmployeePartialState;

  beforeEach(() => {
    state = {
      employee: employeeAdapter.setAll(
        [
          createEmployeeEntity('PRODUCT-AAA'),
          createEmployeeEntity('PRODUCT-BBB'),
          createEmployeeEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Employee Selectors', () => {
    it('getAllEmployee() should return the list of Employee', () => {
      const results = EmployeeSelectors.getAllEmployee(state);
      const selId = getEmployeeId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = EmployeeSelectors.getSelected(state) as EmployeeEntity;
      const selId = getEmployeeId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getEmployeeLoaded() should return the current "loaded" status', () => {
      const result = EmployeeSelectors.getEmployeeLoaded(state);

      expect(result).toBe(true);
    });

    it('getEmployeeError() should return the current "error" state', () => {
      const result = EmployeeSelectors.getEmployeeError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
