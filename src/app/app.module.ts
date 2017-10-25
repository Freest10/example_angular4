import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES }                           from './app.routes';
import { NoContentComponent }               from './no-content';
import { DivisionsService } from './+users/divisions/divisions.service';
import { PositionsService } from './+users/positions/positions.service';
import { UserService }      from './+users/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule
    , RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [DivisionsService, UserService, PositionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
