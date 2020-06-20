import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading = false;

  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.pageSpinnerSubject.subscribe(showSpinner => this.isLoading = showSpinner);
  }
}
