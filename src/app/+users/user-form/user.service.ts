import { User } from './user';
import { USERS } from './mock-users';
import { DivisionsService } from '../divisions/divisions.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  private divisions;
  private users;
  private usersByDivisions;
  private subjectUsersByDivision = new Subject<any>();

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

    this.getDivisionForUsers();

    this.subjectUsersByDivision.next(this.usersByDivisions);
    //return this.usersByDivisions;
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
