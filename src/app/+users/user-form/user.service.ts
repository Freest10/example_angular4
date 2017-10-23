import { User } from './user';
import { USERS } from './mock-users';
import { DivisionsService } from '../divisions/divisions.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private divisions;
  private users;
  private usersByDivisions;
  constructor(private divisionsService: DivisionsService){}

  getUsers(): Promise<User[]> {
    return Promise.resolve(USERS);
  }

  async getUsersByDivisions() {
     this.divisions = await this.divisionsService.getDivisions();
     this.users = await this.getUsers();

    this.getDivisionForUsers();

    return this.usersByDivisions;
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
