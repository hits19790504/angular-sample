import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';

@Injectable()
export class AuthEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      fetch({
        run: (action) => {
          // TODO 認証機能を実装する
          if (action.password !== 'success') {
            return AuthActions.loginFailure({ error: null });
          }
          const account = { id: '1', name: action.username };
          return AuthActions.loginSuccess({ account });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return AuthActions.loginFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
