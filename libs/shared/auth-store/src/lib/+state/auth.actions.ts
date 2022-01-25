import { createAction, props } from '@ngrx/store';
import { AccountEntity, Login } from './auth.models';

export const login = createAction('[Login Page] Login', props<Login>());

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ account: AccountEntity }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: unknown }>()
);
