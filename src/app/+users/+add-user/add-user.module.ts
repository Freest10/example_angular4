import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './add-user.routes';
import { AddUserComponent } from './add-user.component';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatRadioModule} from '@angular/material';

console.log('`ChildDetail` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    RouterModule.forChild(routes),
  ],
})
export class AddUserModule {
  public static routes = routes;
}
