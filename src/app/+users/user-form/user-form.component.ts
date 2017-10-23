import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { User } from './user';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DivisionsService} from '../divisions/divisions.service';
import {PositionsService} from '../positions/positions.service';
import {UserService} from './user.service';
import {Simple} from '../simple';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styles: ['.button-row { margin-top:20px;}']
})
export class UserFormComponent implements OnInit {
  submitted: boolean;
  selectedValue: string;
  model: User = new User(
    10,
    "",
    "",
    "",
    "",
    null,
    1,
    1,
    false,
    false,
    false,
    false
  );
  private positions: Array<Simple>;
  private divisions: Array<Simple>;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private divisionsService: DivisionsService,
    private positionsService: PositionsService
  ){}

  public ngOnInit() {
      this.getDivisions();
      this.getPositions();
      //copy real user data
      if(this.data.user){
        this.model = Object.assign({},this.data.user);
      }

    console.log(this.data, 'hello `AddUserComponent` component');
  }

  previewImage(event) {
    console.log(event, "event");
  }

  getDivisions(): void {
    this.divisionsService.getDivisions().then(divisions => this.divisions = divisions);
  }

  getPositions(): void {
    this.positionsService.getPositions().then(positions => this.positions = positions);
  }

  addUser(): void {
      this.userService.addUser(this.model);
  }

  onSubmit() {
      //merge prev data and chenged data
      if(this.data.user){
          let userData = Object.assign(this.data.user, this.model);
      }else{
        //add new User
        this.addUser();
      }
      this.closeModal();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
