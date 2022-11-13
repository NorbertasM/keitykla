import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import Course, { Currency } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) { 
    this.getCurrencies()
  }

  public getCourse(from: string, to: string) {
    return this.http.get<Course>(`https://api.frankfurter.app/latest?amount=1&from=${from}&to=${to}`)
  }

  public getCurrencies() {
    return this.http.get<Currency>('https://api.frankfurter.app/currencies')
  }
}
