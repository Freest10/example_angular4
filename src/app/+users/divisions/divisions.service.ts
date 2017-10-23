import { Simple } from '../simple';
import { DIVISIONS } from './mock-divisions';
import { Injectable } from '@angular/core';

@Injectable()
export class DivisionsService {
  getDivisions(): Promise<Simple[]> {
    return Promise.resolve(DIVISIONS);
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
