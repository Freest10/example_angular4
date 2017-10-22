import { UsersComponent } from './users.component';

export const routes = [
  { path: '', children: [
    { path: '', component: UsersComponent },
    { path: 'users', name: 'AllUsers', component: UsersComponent },
    { path: 'add_user', name: 'AddUser', loadChildren: './+add-user#AddUserModule' }
  ]},
];
