import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service'
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product
  
  constructor(
    private service: ProductService, 
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails()
    })
  }


  private handleProductDetails() {
    const productId = +this.route.snapshot.paramMap.get('id')!

    this.service.getProductById(productId).subscribe(
      (res) => {
        this.product = res
      },
      (err) => {
        console.error(`Error while get product by Id ${err}`)
      },
      () => {
        console.log('Get product by Id OK')
      }
    )
  }

  addToCart(product: Product) {
    this.cartService.addToCart(new CartItem(product))
  }
}
