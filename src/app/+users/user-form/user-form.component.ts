import {
  Component,
  OnInit,
} from '@angular/core';
import { User } from './user';


@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styles: ['.button-row { margin-top:20px;}']
})
export class UserFormComponent implements OnInit {
  submitted: boolean;
  selectedValue: string;

  model = new User(
    "Вася",
    "Иванов",
    "Иванович",
    "male",
     null,
    1,
    2,
    true,
    false,
    false,
    true
  );

  positions = [
    {value: 1, text: 'Секретарь'},
    {value: 2, text: 'Начальник'},
    {value: 3, text: 'Администратор'},
    {value: 4, text: 'Директор'}
  ];

  divisions = [
    {value: 1, text: 'Департамент управления персоналом'},
    {value: 2, text: 'Департамент управления рисками'}
  ];

  public ngOnInit() {
    console.log('hello `AddUserComponent` component');


  }

  previewImage(event) {
    console.log(event, "event");
  }

  onSubmit() { this.submitted = true; console.log(this.model); }

}
