import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getMonthsList(): Observable<number[]> {
    let months: number[] = []
    const currentMonth = new Date().getMonth() + 1

    for (let i = currentMonth; i <= 12; i++) {
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
