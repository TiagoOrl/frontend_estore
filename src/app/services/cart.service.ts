import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = []
  totalPrice: Subject<number> = new Subject<number>()
  totalQuantity: Subject<number> = new Subject<number>()

  constructor() { }


  addToCart(newItem: CartItem) {
    // check if already in cart
    let alreadyInCart = false
    let existingCartItem: CartItem = undefined

    for (let item of this.cartItems) {
      if (item.id == newItem.id) {
        alreadyInCart = true
        break
      }

        
    }

    if (alreadyInCart)
      return

    this.cartItems.push(newItem)
    this.updateCart()
  }

  private updateCart() {
    
  }
}
