import { Simple } from '../simple';
import { DIVISIONS } from './mock-divisions';
import { Injectable } from '@angular/core';
import {Filter} from '../filter/filter';

@Injectable()
export class DivisionsService {
  private filterValue: Filter;

  getDivisions(): Promise<Simple[]> {
    return Promise.resolve(DIVISIONS);
  }

  async getfilteredDivisions() {
    let filterdDivisions =  await this.getDivisions();
    let divisionIdAtFilter = await this.getDivisionId();
    if (filterdDivisions && divisionIdAtFilter) {
        filterdDivisions = filterdDivisions.filter((division) => {
              let filteredVal = division.value;
              return divisionIdAtFilter === filteredVal;
        });
    }
    return filterdDivisions;
  }

  private getDivisionId() {
    return new Promise((resolve, reject) => {
      if(this.filterValue) {
        if(this.filterValue.division) {
          resolve(this.filterValue.division);
        }
      }
      resolve(null);
    });
  }

  setFilterValue(value){
    this.filterValue = value;
  }
}
