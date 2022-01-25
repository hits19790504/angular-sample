import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as EmployeeActions from './employee.actions';
import * as EmployeeFeature from './employee.reducer';
import * as EmployeeSelectors from './employee.selectors';

@Injectable()
export class EmployeeFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(EmployeeSelectors.getEmployeeLoaded));
  allEmployee$ = this.store.pipe(select(EmployeeSelectors.getAllEmployee));
  selectedEmployee$ = this.store.pipe(select(EmployeeSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(EmployeeActions.init());
  }
}
