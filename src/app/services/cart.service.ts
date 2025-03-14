import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = []
  totalPrice: Subject<number> = new Subject<number>()
  totalAmount: Subject<number> = new Subject<number>()

  constructor() { }


  addToCart(newItem: CartItem) {
    // check if already in cart
    let alreadyInCart = false

    for (let item of this.cartItems) {
      if (item.id == newItem.id) {
        item.amount++
        alreadyInCart = true
        break
      }
    }

    if (alreadyInCart) {
      this.updateCart()
      return
    }

    this.cartItems.push(newItem)
    this.updateCart()
  }

  updateCart() {
    let totalValue = 0
    let totalAmount = 0

    for (let item of this.cartItems) {
      totalValue += item.amount * item.unitPrice
      totalAmount += item.amount
    }

    // publish the new values ...  all subscribers will receive the new data
    this.totalPrice.next(totalValue)
    this.totalAmount.next(totalAmount)
  }
}
