import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import {DivisionsService} from '../divisions/divisions.service';
import {PositionsService} from '../positions/positions.service';
import {UserService} from '../user-form/user.service';
import {Simple} from '../simple';
import {Filter} from './filter';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styles: ['form::after{clear:both}, ul li{float:left}']
})
export class FilterComponent implements OnInit {
  private model: Filter = new Filter(
    "",
    null,
    null
  );
  private positions: Array<Simple>;
  private divisions: Array<Simple>;

  constructor(
    private userService: UserService,
    private divisionsService: DivisionsService,
    private positionsService: PositionsService
  ){}

  public ngOnInit() {
      this.getDivisions();
      this.getPositions();
  }

  getDivisions(): void {
    this.divisionsService.getDivisions().then(divisions => this.divisions = divisions);
  }

  getPositions(): void {
    this.positionsService.getPositions().then(positions => this.positions = positions);
  }

  sendFilter(): void{
      this.userService.setFilterValue(this.model);
      console.log(this.model);
  }

}
