import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getMonthsList(startMonth: number): Observable<number[]> {
    let months: number[] = []

    if (startMonth > 11 || startMonth < 1)
      return of ([])

    for (let i = startMonth; i <= 12; i++) {
      months.push(i)
    }

    return of(months)
  }

  getFutureYearsList(): Observable<number[]> {
    let years = []

    const currentYear = new Date().getFullYear()

    for (let i = currentYear; i <= currentYear + 20; i++) {
      years.push(i)
    }

    return of(years)
  }
}
