import { User } from './user';
import { USERS } from './mock-users';
import { DivisionsService } from '../divisions/divisions.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Filter} from '../filter/filter';
import {Simple} from '../simple';
import {UserByDivisions} from './users-by-division.interface';

@Injectable()
export class UserService {

  private divisions: Simple[];
  private users: User[];
  private usersByDivisions: UserByDivisions;
  private subjectUsersByDivision = new Subject<any>();
  private filterValue: Filter;

  constructor(private divisionsService: DivisionsService) {}

  getUsers(): Promise<User[]> {
    return Promise.resolve(USERS);
  }

  getUser(id: number): Promise<User> {
    return this.getUsers()
      .then(users => users.find(user => user.id === id));
  }

  getUsersObserve(): Observable<any> {
    return this.subjectUsersByDivision;
  }

  // раздает подписчикам (блоку пользователи) отфильтрованные данные
  async emitUsersByDivisions() {

     this.divisions = await this.divisionsService.getfilteredDivisions();
     this.users = await this.getUsers();

     if (this.divisions && this.users) {
       // фильтруем пользователей
       this.filterUsers();

       // распределяем пользователей по подразделениям
       this.getDivisionForUsers();
     }

     // данные для подписчиков, список пользователей и подразделений, которые прошли фильтрацию
     const usersData = {
       users: this.usersByDivisions,
       divisions: this.divisions
     }

     this.subjectUsersByDivision.next(usersData);
  }

  private filterUsers() {
    this.users = this.users.filter((user) => {
      let filterPassed = true;
      if (this.filterValue) {
        for (const value in this.filterValue) {

          const filterVal = this.filterValue[value];
          const userVal = user[value];

          if (!filterVal) {
            continue;
          }

          if (typeof filterVal === 'string') {
            const userValLower = userVal.trim().toLowerCase();
            const filterValLower = filterVal.trim().toLowerCase();

            if (!(userValLower.indexOf(filterValLower) > -1)) {
              filterPassed = false;
              break;
            }
          }else if (typeof filterVal === 'number') {
            if (filterVal !== userVal) {
              filterPassed = false;
              break;
            }
          }
        }
      }
      return filterPassed;
    });
  }

  private getDivisionForUsers() {
    this.usersByDivisions = {};

    this.divisions.forEach((division) => {
      this.usersByDivisions[division.value] = [];
    });

    this.setUsersForDivions();
  }

  private setUsersForDivions() {
    this.users.forEach((user) => {
      this.usersByDivisions[user.division].push(user);
    });
  }

  async addUser(user: User) {
    await this.getUsers().then(users => users.push(user));
    this.emitUsersByDivisions();
  }

  async deleteUser(id: number) {
    await this.getUsers().then(users => {
      for (let i = 0; i < users.length;  i++) {
        const user = users[i];
        if (user.id === id) {
          users.splice(i, 1);
        }
      }
    });
    this.emitUsersByDivisions();
  }

  setFilterValue(value){
    this.filterValue = value;
    this.emitUsersByDivisions();
  }

  async setUserDataById(id: number, data: User) {
    const users = await this.getUsers();
    users.forEach((user) => {
      if (user.id === id) {
        Object.assign(user, data);
      }
    });
    this.emitUsersByDivisions();
  }
}
