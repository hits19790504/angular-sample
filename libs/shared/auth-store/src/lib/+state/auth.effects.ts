import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';
import { AuthApiService } from '../services/auth-api.service';

import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';

@Injectable()
export class AuthEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      fetch({
        run: (action) => {
          return this.authApiService
            .login(action.username, action.password)
            .pipe(
              map((account) => {
                return AuthActions.loginSuccess({ account });
              })
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return AuthActions.loginFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authApiService: AuthApiService
  ) {}
}
