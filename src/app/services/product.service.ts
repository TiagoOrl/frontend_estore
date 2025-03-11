import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/public/product'

  constructor(private httpClient: HttpClient) { }


  getProductList(pagination: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '?' + pagination)
  }

  getProductByCatId(pagination: string, catId: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/get-by-category' + '?' + 'catId=' + catId
      + '&' + pagination
    )
  }

  getProductByName(pagination: string, value: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/get-by-name' + '?' + pagination, {name: value})
  }

  getProductById(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/${id}`)
  }

}