import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SettingsService } from 'src/app/shared/settings.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent implements OnInit {
  calculatorForm: FormGroup;
  leavingOrderedTime: string;
  isCalculated = false;
  leavingFromNow: string;

  ngOnInit(): void {
    this.calculatorForm = new FormGroup({
      leavingTime: new FormControl(null, Validators.required),
      wayBackTime: new FormControl(null)
    });
  }

  calculate(): void {
    this.isCalculated = true;
    moment.relativeTimeThreshold('m', 60);
    moment.relativeTimeThreshold('h', 24 * 26);
    const time = moment(this.calculatorForm.get('leavingTime').value)
      .subtract(SettingsService.HOURSINADVANCE, 'hours').locale('he');
    this.leavingOrderedTime = time.format('LLLL');
    this.leavingFromNow = time.fromNow();
  }

  onSubmit(): void {

  }
}
