import { Routes } from '@angular/router';
import { UserEdit } from './user-edit/user-edit';
import { UserSearch } from './user-search/user-search';
import { JsonSchemaTest } from './pages/json-schema-test/json-schema-test';
import { Switcher } from './core/forms/switcher/switcher';
import { SwitcherTest } from './pages/switcher-test/switcher-test';

export const routes: Routes = [
  {
    path: '',
    component: UserSearch,
  },
  {
    path: 'user/:id',
    component: UserEdit,
  },
  {
    path: 'json-schema',
    component: JsonSchemaTest
  },
  {
    path: 'control-value',
    component: SwitcherTest
  }
];
