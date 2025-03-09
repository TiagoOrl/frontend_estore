import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = []
  currentCategoryId: number = 1

  constructor(private productService: ProductService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.listProductsByCatId()
    })

    this.listAllProducts()
  }


  private listProductsByCatId() {
    // check if 'id has been passed in the parameter URL (category:id)'
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')

    if (hasCategoryId)
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id')!)
    else
      this.currentCategoryId = 1


    this.productService.getProductByCatId("page=0&size=40", this.currentCategoryId).subscribe(
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


  private listAllProducts() {
    this.productService.getProductList("page=0&size=20").subscribe(
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
