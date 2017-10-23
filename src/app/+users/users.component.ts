import {
  Component,
  OnInit,
  OnChanges
} from '@angular/core';

import {UserService} from './user-form/user.service';
import {DivisionsService} from './divisions/divisions.service';
import {PositionsService} from './positions/positions.service';
import {UserFormComponent} from './user-form/user-form.component';
import {User} from './user-form/user';
import {MatDialog} from '@angular/material';
import {Simple} from './simple';

@Component({
  selector: 'users',
  templateUrl: './user.component.html'
})
export class UsersComponent implements OnInit, OnChanges {

  private divisions: Array<Simple>;
  public usersByDivisions: any = {};
  private positions: Object;
  private subscriptionUsers;
  constructor(
    private userService: UserService,
    private divisionsService: DivisionsService,
    private positionsService: PositionsService,
    public dialog: MatDialog
  ) {}

  public ngOnInit() {
    this.getDivisions();
    //this.getUsersByDivisions();
    this.getPostionsObject();

    this.subscriptionUsers = this.userService.getUsersObserve().subscribe(users => {
       this.usersByDivisions = users;
      console.log(this.usersByDivisions, 'usersByDivisions');
    });

    this.userService.getUsersByDivisions();
    console.log(this, "UsersComponent");
  }

  public ngOnChanges(event) {
    console.log(event, this, "ngOnChanges")
  }

  getDivisions(): void {
    this.divisionsService.getDivisions().then(divisions => this.divisions = divisions);
  }

  getPositions(): void {
    this.positionsService.getPositions().then(positions => this.positions = positions);
  }


  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }

  getUsersByDivisions(): void {
   // this.userService.getUsersByDivisions().then(usersByDivisions => this.usersByDivisions = usersByDivisions);
  }

  getPostionsObject(): void{
    this.positionsService.getPostionsObject().then(positions => this.positions = positions);
  }

  private showUserInfo(user?: User) {
    let data= {
      user: user
    };
    let dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: data
    });
  }

}
