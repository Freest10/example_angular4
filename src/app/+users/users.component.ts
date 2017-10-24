import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

import {UserService} from './user/user.service';
import {DivisionsService} from './divisions/divisions.service';
import {PositionsService} from './positions/positions.service';
import {UserFormComponent} from './user-form/user-form.component';
import {User} from './user/user';
import {MatDialog} from '@angular/material';
import {Simple} from './simple';

@Component({
  selector: 'users',
  templateUrl: './user.component.html',
  styles: ['h4{display:inline;margin-right:20px;} .addUserToDivision{position: relative;top: 6px;cursor: pointer;}']
})
export class UsersComponent implements OnInit, OnDestroy {

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

    this.subscriptionUsers = this.userService.getUsersObserve().subscribe( (usersData) => {
       this.usersByDivisions = usersData.users;
       this.divisions = usersData.divisions;
    });

    this.userService.getUsersByDivisions();
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

  addUserToDivision(id){
    let data= {
      division: id
    };
    this.dialog.open(UserFormComponent, {
      width: '600px',
      data: data
    });
  }

  ngOnDestroy(){
    console.log("ngOnDestroy")
    this.subscriptionUsers.unsubscribe();
  }

}
