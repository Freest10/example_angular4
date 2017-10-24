import {
  Component,
  OnInit,
  Inject,
  OnDestroy
} from '@angular/core';

import {DivisionsService} from '../divisions/divisions.service';
import {PositionsService} from '../positions/positions.service';
import {UserService} from '../user/user.service';
import {Simple} from '../simple';
import {Filter} from './filter';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styles: ['ul li{float:left;margin-left:20px;} .filtr-form{width:700px;}'],
  providers: [FormBuilder]
})
export class FilterComponent implements OnInit, OnDestroy {
  private form;
  private positions: Array<Simple>;
  private divisions: Array<Simple>;

  constructor(
    private userService: UserService,
    private divisionsService: DivisionsService,
    private positionsService: PositionsService,
    private formBuilder: FormBuilder
  ){}

  public ngOnInit() {
      console.log("initForm");
      this.initForm();
      this.getDivisions();
      this.getPositions();
  }

  private initForm(){
    let formModel = new Filter(
      "",
      null,
      null
    );

    this.form = this.formBuilder.group(formModel);

    this.form.valueChanges.subscribe(data => {
      this.userService.setFilterValue(data);
    });
  }

  getDivisions(): void {
    this.divisionsService.getDivisions().then(divisions => this.divisions = divisions);
  }

  getPositions(): void {
    this.positionsService.getPositions().then(positions => this.positions = positions);
  }

  ngOnDestroy(){
    //filter clear after destroy
    this.form.reset();
  }

}
