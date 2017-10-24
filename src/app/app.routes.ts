import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/task1', pathMatch: 'full' },
  { path: 'task1', loadChildren: './+users#UsersModule' },
  { path: 'task2',    component: NoContentComponent },
  { path: '**',    component: NoContentComponent }
];
