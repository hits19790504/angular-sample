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
          // TODO 従業員データサービスから取得する
          return EmployeeActions.loadEmployeeSuccess({
            employee: [
              { id: '1', name: 'あいうえお' },
              { id: '2', name: 'かきくけこ' },
              { id: '3', name: 'さしすせそ' },
            ],
          });
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
