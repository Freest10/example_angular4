import { Simple } from '../simple';
import { POSITIONS } from './mock-positions';
import { Injectable } from '@angular/core';

@Injectable()
export class PositionsService {
  getPositions(): Promise<Simple[]> {
    return Promise.resolve(POSITIONS);
  }

  getPostion(id: number): Promise<Simple> {
    return this.getPositions()
      .then(positions => positions.find(position => position.value === id));
  }

  getPostionsObject(): Promise<Object> {
    return this.getPositions().then(positions => this.getPostionsObjectFromArray(positions));
  }

  getPostionsObjectFromArray(positionsArr): Object {
    let positionsById = {};
    positionsArr.forEach((position)=> {
      positionsById[position.value] = position.text;
    });
    return positionsById;
  }
}
