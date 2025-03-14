import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  totalPrice = 0.0
  totalAmount = 0

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus()
  }


  private updateCartStatus() {
    // subscribe to the totalPrice
    this.cartService.totalPrice.subscribe(
      total => this.totalPrice = total
    )

    // subscrite to the totalAmount
    this.cartService.totalAmount.subscribe(
      totalAmount => this.totalAmount = totalAmount
    )
  }

}
