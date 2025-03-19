import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/public/category'

  constructor(private httpClient: HttpClient) {

  }


  getCategoriesList(pagination: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '?' + pagination)
  }
}
