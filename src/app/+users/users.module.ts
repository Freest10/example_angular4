import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './users.routes';
import { UsersComponent } from './users.component';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatRadioModule, MatDialogModule} from '@angular/material';
import { UserFormComponent } from './user-form/user-form.component';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    UsersComponent,
    UserFormComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [UserFormComponent]
})
export class UsersModule {
  public static routes = routes;
}
