import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = []

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.listProducts()
  }


  private listProducts() {
    this.productService.getProductList().subscribe(
      (res) => {
        this.products = res
      },
      (error) => {
        console.error(`Get all products failed: ${error}`)
      },
      () => {
        console.log(`Get all products OK`)
      }
    )
  }

}
