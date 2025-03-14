import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = []
  totalPrice = 0.0
  totalAmount = 0

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails()
  }

  private listCartDetails() {
    this.cartItems = this.cartService.cartItems

    this.cartService.totalAmount.subscribe(
      data => this.totalAmount = data
    )

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this.cartService.updateCart()
  }

  incrementItem(item: CartItem) {
    this.cartService.addToCart(item)
  }

  decrementItem(item: CartItem) {
    this.cartService.decrementFromCart(item)
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item)
  }

}
