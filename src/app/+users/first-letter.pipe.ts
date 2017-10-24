import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firstLetter' })
export class FirstLetterPipe implements PipeTransform {
  transform(text: string) {
    if(text){
      let textTransformed = text.charAt(0).toUpperCase() + '.';
      return textTransformed;
    }
   // return allHeroes.filter(hero => hero.canFly);
  }
}
