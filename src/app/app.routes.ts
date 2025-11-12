import { Routes } from '@angular/router';
import { UserEdit } from './user-edit/user-edit';

export const routes: Routes = [{
    path: 'user/:id',
    component: UserEdit
}];
