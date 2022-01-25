import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as EmployeeActions from './employee.actions';
import { EmployeeEffects } from './employee.effects';

describe('EmployeeEffects', () => {
  let actions: Observable<Action>;
  let effects: EmployeeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        EmployeeEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(EmployeeEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EmployeeActions.init() });

      const expected = hot('-a-|', {
        a: EmployeeActions.loadEmployeeSuccess({ employee: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
