import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { Moment } from 'moment';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { CalculatorService } from 'src/app/shared/services/http/calculator.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styles: [`.halfVh {height: 30vh} .half-width {width: 50%;}`]
})
export class CalculatorComponent implements OnInit {
  calculatorForm: FormGroup;
  leavingOrderedTime: string;
  isCalculated = false;
  leavingFromNow: string;
  showSendEmailButton = false;
  calculatedTime: Moment;
  unixTimestamp: number;

  constructor(private spinnerService: SpinnerService, private calculatorService: CalculatorService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.calculatorForm = new FormGroup({
      leavingTime: new FormControl(null, Validators.required),
      email: new FormControl(null)
    });
  }

  calculate(): void {
    if (this.calculatorForm.get('leavingTime').valid) {
      this.isCalculated = true;
      moment.relativeTimeThreshold('m', 60);
      moment.relativeTimeThreshold('h', 24 * 26);
      this.calculatedTime = moment(this.calculatorForm.get('leavingTime').value)
        .subtract(SettingsService.HOURSINADVANCE, 'hours').locale('he');

      this.unixTimestamp = moment(this.calculatorForm.get('leavingTime').value)
        .subtract(SettingsService.HOURSINADVANCE, 'hours').locale('he').unix();

      this.leavingOrderedTime = this.calculatedTime.format('LLLL');
      this.leavingFromNow = this.calculatedTime.fromNow();
      this.checkEmailAvailability();
      this.setValidators();
    }
  }

  private checkEmailAvailability(): void {
    this.showSendEmailButton = this.calculatedTime > moment().add(1, 'minutes');
  }

  private setValidators(): void {
    this.calculatorForm.get('email').setValidators([Validators.required, Validators.email]);
  }

  onSubmit(): void {
    if (this.calculatorForm.valid) {
      const data = {email: this.calculatorForm.get('email').value, orderedTime: this.unixTimestamp};
      this.spinnerService.setPageSpinner(true);
      this.calculatorService.sendEmail(data).then(response => {
        this.spinnerService.setPageSpinner(false);
        if (response) {
          this.notificationService.success('תזכורת תישלח לאימייל בזמן שהוגדר');
        } else {
         this.notificationService.error('השליחה נכשלה. נסה שנית מאוחר יותר');
        }
      });
    }
  }

}
