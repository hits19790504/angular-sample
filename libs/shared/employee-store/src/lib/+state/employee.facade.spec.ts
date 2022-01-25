import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as EmployeeActions from './employee.actions';
import { EmployeeEffects } from './employee.effects';
import { EmployeeFacade } from './employee.facade';
import { EmployeeEntity } from './employee.models';
import {
  EMPLOYEE_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './employee.reducer';
import * as EmployeeSelectors from './employee.selectors';

interface TestSchema {
  employee: State;
}

describe('EmployeeFacade', () => {
  let facade: EmployeeFacade;
  let store: Store<TestSchema>;
  const createEmployeeEntity = (id: string, name = ''): EmployeeEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(EMPLOYEE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([EmployeeEffects]),
        ],
        providers: [EmployeeFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(EmployeeFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allEmployee$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allEmployee$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadEmployeeSuccess` to manually update list
     */
    it('allEmployee$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allEmployee$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        EmployeeActions.loadEmployeeSuccess({
          employee: [createEmployeeEntity('AAA'), createEmployeeEntity('BBB')],
        })
      );

      list = await readFirst(facade.allEmployee$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
