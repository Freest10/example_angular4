import { User } from './user';
import { USERS } from './mock-users';
import { DivisionsService } from '../divisions/divisions.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {Filter} from '../filter/filter';

@Injectable()
export class UserService {

  private divisions;
  private users;
  private usersByDivisions;
  private subjectUsersByDivision = new Subject<any>();
  private filterValue: Filter;

  constructor(private divisionsService: DivisionsService) {}

  getUsers(): Promise<User[]> {
    return Promise.resolve(USERS);
  }

  getUsersObserve(): Observable<any> {
    return this.subjectUsersByDivision;
  }

  async getUsersByDivisions() {
     this.divisions = await this.divisionsService.getDivisions();
     this.users = await this.getUsers();
     console.log(this.users, "this.users");
     //this.filterDivisions();
     this.filterUsers();
     this.getDivisionForUsers();

     let usersData = {
       users: this.usersByDivisions,
       divisions: this.getfilterDivisions()
     }

     this.subjectUsersByDivision.next(usersData);
    //return this.usersByDivisions;
  }

  private getfilterDivisions() {
    let filterdDivisions = this.divisions;
    if (this.divisions) {
        filterdDivisions = this.divisions.filter((division) => {
        if (this.filterValue) {
          let filterVal = this.filterValue.division;
          if(filterVal){
            let filteredVal = division.value;
            return filterVal === filteredVal;
          }
        }
        return true;
      });
    }

    return filterdDivisions;
  }

  private filterUsers() {
    this.users = this.users.filter((user) => {
      let filterPassed = true;
      if(this.filterValue){
        for (let value in this.filterValue) {

          let filterVal = this.filterValue[value];
          let userVal = user[value];

          if(!filterVal) continue;

          if (typeof filterVal == "string") {
            let userValLower = userVal.trim().toLowerCase();
            let filterValLower = filterVal.trim().toLowerCase();

            if (!(userValLower.indexOf(filterValLower) > -1)) {
              filterPassed = false;
              break;
            }
          }else if (typeof filterVal == "number") {
            if(filterVal !== userVal){
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
      console.log(this.usersByDivisions, "user");
      this.usersByDivisions[user.division].push(user);
    });
  }

  async addUser(user: User){
    await this.getUsers().then(users => users.push(user));
    this.getUsersByDivisions();
  }

  async deleteUser(id: number){
    await this.getUsers().then(users => {
      for(let i=0; i < users.length;  i++) {
        let user = users[i];
        if(user.id == id){
          users.splice(i, 1);
        }
      }
    });
    this.getUsersByDivisions();
  }

  setFilterValue(value){
    this.filterValue = value;
    this.getUsersByDivisions();
  }

  /*
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }*/
}
