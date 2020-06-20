import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorService {
  readonly endPoint = environment.apiUrl + '/email';

  constructor(private http: HttpClient) {}

  sendEmail(formValues): Promise<any> {
    return this.http.post(this.endPoint, formValues)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}
