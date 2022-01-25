import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, State } from './auth.reducer';

export const getAuthState = createFeatureSelector<State>(AUTH_FEATURE_KEY);

export const getAccount = createSelector(
  getAuthState,
  (state: State) => state.account
);

export const getError = createSelector(
  getAuthState,
  (state: State) => state.error
);

export const getIsLoggedIn = createSelector(
  getAuthState,
  (state: State) => state.isLogedIn
);
