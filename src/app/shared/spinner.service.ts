import { Subject } from 'rxjs';

export class SpinnerService {
  pageSpinnerSubject: Subject<boolean> = new Subject();

  setPageSpinner(isShown: boolean): void {
    setTimeout(() => this.pageSpinnerSubject.next(isShown), 0);
  }
}
