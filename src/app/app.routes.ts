import { Routes } from '@angular/router';
import { UserEdit } from './user-edit/user-edit';
import { UserSearch } from './user-search/user-search';
import { JsonSchemaTest } from './pages/json-schema-test/json-schema-test';

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
  }
];
