import { Routes } from '@angular/router';
import { UserEdit } from './user-edit/user-edit';
import { UserSearch } from './user-search/user-search';

export const routes: Routes = [
  {
    path: '',
    component: UserSearch,
  },
  {
    path: 'user/:id',
    component: UserEdit,
  },
];
