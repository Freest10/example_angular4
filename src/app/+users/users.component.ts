import {
  Component,
  OnInit,
} from '@angular/core';

import {UserService} from './user-form/user.service';
import {DivisionsService} from './divisions/divisions.service';
import {PositionsService} from './positions/positions.service';
import {UserFormComponent} from './user-form/user-form.component';
import {MatDialog} from '@angular/material';
import {Simple} from './simple';

@Component({
  selector: 'users',
  template: `
    <h1>Task2</h1>
    <span>
      <a [routerLink]="['/task1/users']" >
       Все Пользователи
      </a>
      <a>
       Добавить пользователя
      </a>
    </span>
    <div class="departaments">
      <table>
        <ng-container *ngFor="let division of divisions">
          <tr>
            <h4>{{division.text}}</h4>
          </tr>
          <ng-container *ngIf="usersByDivisions[division.value]">
            <ng-container *ngFor="let userByDivision of usersByDivisions[division.value]">
            <tr>
              <td>
                {{userByDivision.secondName}}
              </td>
              <td>
                {{getPostion(userByDivision.position)}}
              </td>
              <td>
                {{userByDivision.photo}}
              </td>
              <td>
                <div >посмотреть</div>
              </td>
              <td>
                <div>удалить</div>
              </td>
            </tr>
            </ng-container>
          </ng-container>
        </ng-container>
      </table>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class UsersComponent implements OnInit {

  private divisions: Array<Simple>;
  private usersByDivisions: any;
  private positions: Array<Simple>;
  constructor(
    private userService: UserService,
    private divisionsService: DivisionsService,
    private positionsService: PositionsService,
    public dialog: MatDialog
  ) {}

  public ngOnInit() {

    this.getDivisions();
    this.getUsersByDivisions();
    console.log(this, this.divisions, 'hello `UsersComponent` component');
    this.userService.getUsersByDivisions();
  }

  getDivisions(): void {
    this.divisionsService.getDivisions().then(divisions => this.divisions = divisions);
  }

  getPositions(): void {
    this.positionsService.getPositions().then(positions => this.positions = positions);
  }


  getUsersByDivisions(): void {
    this.userService.getUsersByDivisions().then(usersByDivisions => this.usersByDivisions = usersByDivisions);
  }

  getPostion(id: number){
    return this.positionsService.getPostion(id);
  }
//(click)="showUserInfo(1)"
  private showUserInfo(user){
    //console.log(this.dialog, "this.dialog.");
    /*let dialogRef = this.dialog.open(UserFormComponent, {
      height: '400px',
      width: '600px',
    });*/
  }

}
