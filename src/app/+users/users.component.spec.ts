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
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {Subject} from "rxjs/Subject";

describe('UsersComponent', () => {

  let fixture: ComponentFixture<UsersComponent>;
  let userService: UserService;

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

    fixture = TestBed.createComponent(UsersComponent);
    userService = fixture.debugElement.injector.get(UserService);
  });

  it('should create the users', (() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should inject userService', (() => {
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app.userService).toBeTruthy();
  }));

  it('should get the divisions', (async() => {
    const app = fixture.debugElement.componentInstance;
    app.getDivisions();
    fixture.detectChanges();

    /*fixture.whenStable().then(() => { // wait for async getQuote
      console.log(app.divisions, "sasd");
    });*/

    expect(app).toBeTruthy();
  }));

  it('it should be user table info', (async() => {
    const app = fixture.debugElement.componentInstance;
    app.getDivisions();
    app.getPostionsObject();

    app.divisions = [
      {
        value: 1,
        text: 'Бухгалтерия'
      }
    ];

    app.positions = {
        1: 'Секретарь'
    };
    app.usersByDivisions = {
      1: [{
        secondName: 'Иванов',
        name: 'Иван',
        thirdName: 'Иванович',
        position: 1,
        photo: null
      }]
    };
    fixture.detectChanges();
    const nativeEl = fixture.debugElement.nativeElement;
    const positionText = nativeEl.querySelector('table tr:nth-child(2) .position').textContent;
    const fioText = nativeEl.querySelector('table tr:nth-child(2) .fio').textContent.trim();
    expect(positionText).toEqual('Секретарь');
    expect(fioText).toEqual('Иванов И. И.');
  }));

  it('should get users and divisions data', async() => {
    spyOn(userService, 'getUsersObserve').and.returnValue(new Subject<any>());
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      app.userService.emitUsersByDivisions();
      expect(app.divisions[0].value).toEqual(1);
    });
  });
});


