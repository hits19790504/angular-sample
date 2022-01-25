import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  account$ = this.store.pipe(select(AuthSelectors.getAccount));
  error$ = this.store.pipe(select(AuthSelectors.getError));
  isLogedIn$ = this.store.pipe(select(AuthSelectors.getIsLoggedIn));

  success$ = this.actions$.pipe(ofType(AuthActions.loginSuccess));
  failure$ = this.actions$.pipe(ofType(AuthActions.loginFailure));

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions
  ) {}

  login(username: string, password: string): void {
    this.store.dispatch(AuthActions.login({ username, password }));
  }
}
