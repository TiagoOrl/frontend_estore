import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

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

}