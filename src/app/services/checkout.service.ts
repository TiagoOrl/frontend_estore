import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderProduct } from 'src/app/common/order-product'

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private orderUrl = 'http://localhost:8080/api/user/order'
  private orderproductUrl = 'http://localhost:8080/api/user/order_product'

  constructor(private httpClient: HttpClient) { }

  createOrderForClient(clientId: number): Observable<any> {
    return this.httpClient.post(this.orderUrl + `/create/${clientId}`, {})
  }


  addProductToOrder(orderProduct: OrderProduct): Observable<any> {
    return this.httpClient.post(this.orderproductUrl + `/add`, orderProduct)
  }


}
