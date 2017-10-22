import {
  Component,
  OnInit,
} from '@angular/core';


@Component({
  selector: 'users',
  template: `
    <h1>Task2</h1>
    <span>
      <a [routerLink]="['/task1/users']" >
       Все Пользователи
      </a>
      <a [routerLink]=" ['/task1/add_user'] ">
       Добавить пользователя
      </a>
    </span>
    <router-outlet></router-outlet>
  `,
})
export class UsersComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `UsersComponent` component');
  }

}
