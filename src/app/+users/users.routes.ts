import { UsersComponent } from './users.component';

export const routes = [
  { path: '', children: [
    { path: '', component: UsersComponent },
    { path: 'users', component: UsersComponent }
  ]},
];
