import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import {FilterComponent} from './filter/filter.component';
import { FirstLetterPipe } from './first-letter.pipe';
import { ImageFromFilePipe } from './image-from-file.pipe';
import { RouterModule } from '@angular/router';
import { routes } from './users.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';
import { DivisionsService } from './divisions/divisions.service';
import { PositionsService } from './positions/positions.service';
import { UserService }      from './user/user.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {APP_BASE_HREF} from '@angular/common';

describe('UsersComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, FilterComponent, FirstLetterPipe, ImageFromFilePipe],
      imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatDialogModule,
        MatIconModule,
        MatCardModule,
        FormsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)],
      providers: [DivisionsService, UserService, PositionsService, {provide: APP_BASE_HREF, useValue : '/' }]
    });

  });

  it('should create the users', (() => {
    const fixture = TestBed.createComponent(UsersComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should get the divisions', (async() => {
    const fixture = TestBed.createComponent(UsersComponent);
    const app = fixture.debugElement.componentInstance;
    app.getDivisions();
    fixture.detectChanges();

    fixture.whenStable().then(() => { // wait for async getQuote
      console.log(app.divisions, "sasd");
    });

    expect(app).toBeTruthy();
  }));
});
