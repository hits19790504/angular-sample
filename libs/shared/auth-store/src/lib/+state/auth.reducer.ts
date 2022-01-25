import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AccountEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  account?: AccountEntity | null;
  error?: unknown | null;
  isLogedIn: boolean;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = { isLogedIn: false };

const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { account }) => ({
    ...state,
    account,
    error: null,
    isLogedIn: true,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    account: null,
    error,
    isLogedIn: false,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
