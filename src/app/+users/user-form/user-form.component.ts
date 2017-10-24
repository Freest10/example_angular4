import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { User } from '../user/user';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DivisionsService} from '../divisions/divisions.service';
import {PositionsService} from '../positions/positions.service';
import {UserService} from '../user/user.service';
import {Simple} from '../simple';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styles: ['.button-row { margin-top:20px;}']
})
export class UserFormComponent implements OnInit {
  submitted: boolean;
  selectedValue: string;
  model: User;
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
      this.createUserModel();
      this.getDivisions();
      this.getPositions();
      //copy real user data
      if(this.data.user){
        this.model = Object.assign({},this.data.user);
      }
  }

  private createUserModel(){
      let minId = 100;
      let maxId = 1000;
      let division = (this.data.division) ? this.data.division : null;
      //New user must have random id from minId to maxId
      this.model = new User(
        Math.floor(Math.random() * (maxId - minId + 1)) + minId,
        "",
        "",
        "",
        "male",
        null,
        null,
        division,
        false,
        false,
        false,
        false
      );
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
          this.userService.setUserDataById(this.data.user.id, this.model);
          //let userData = Object.assign(this.data.user, this.model);
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
