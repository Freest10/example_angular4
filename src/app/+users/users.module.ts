import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './users.routes';
import { UsersComponent } from './users.component';
import {  MatButtonModule,
          MatCheckboxModule,
          MatInputModule,
          MatSelectModule,
          MatRadioModule,
          MatDialogModule,
          MatIconModule
        } from '@angular/material';
import { UserFormComponent } from './user-form/user-form.component';
import { FilterComponent } from './filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstLetterPipe } from './first-letter.pipe';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    UsersComponent,
    UserFormComponent,
    FilterComponent,
    FirstLetterPipe
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
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [UserFormComponent]
})
export class UsersModule {
  public static routes = routes;
}
