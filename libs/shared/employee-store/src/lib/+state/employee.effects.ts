import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as EmployeeActions from './employee.actions';
import * as EmployeeFeature from './employee.reducer';

@Injectable()
export class EmployeeEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return EmployeeActions.loadEmployeeSuccess({ employee: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EmployeeActions.loadEmployeeFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
