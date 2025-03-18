import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = []
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  totalAmount: BehaviorSubject<number> = new BehaviorSubject<number>(0)

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

  decrementFromCart(toRemoveItem: CartItem) {
    let shouldRemove = false

    for (const item of this.cartItems) {
      if (item == toRemoveItem) {
        if (item.amount < 2) {
          shouldRemove = true
        } 

        else {
          item.amount--
        }
      }
    }

    

    if (shouldRemove) {
      this.removeFromCart(toRemoveItem)
    }
      

    this.updateCart()
  }


  removeFromCart(toRemoveItem: CartItem) {
    const itemIndex = this.cartItems.findIndex( item => item.id == toRemoveItem.id)
    this.cartItems.splice(itemIndex, 1)

    this.updateCart()
  }


  updateCart() {
    let totalValue = 0
    let totalAmount = 0

    for (let item of this.cartItems) {
      totalValue += item.amount * item.unitPrice
      totalAmount += item.amount
    }

    // publish the new values ...  all subscribers will receive the new data, update the UI
    this.totalPrice.next(totalValue)
    this.totalAmount.next(totalAmount)
  }
}
