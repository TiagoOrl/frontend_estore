import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service'
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = []
  searchMode = false
  previousCategoryId = 1
  currentCategoryId = 1
  currentKeyword = ""
  previousKeyword = ""

  pageNumber = 1
  pageSize = 2
  totalElements = 0

  constructor(
    private productService: ProductService, 
    private cartService: CartService, 
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.listProducts()
    })
  }


  listProducts() {

    // check if 'id has been passed in the parameter URL (category:id)'
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')
    this.searchMode = this.route.snapshot.paramMap.has('keyword')

    if (this.searchMode) {
      this.listByName(this.route.snapshot.paramMap.get('keyword')!)
      return
    }


    if (hasCategoryId) {
      this.listProductsByCatId(Number(this.route.snapshot.paramMap.get('id')!))
    }
    else
      this.listAllProducts()
  }


  listAllProducts() {
    this.productService.getProductList(`page=${this.pageNumber - 1}&size=${this.pageSize}`).subscribe(
      (res) => {
        this.products = res.list
        this.pageNumber = res.page + 1
        this.pageSize = res.size
        this.totalElements = res.totalElements
      },
      (error) => {
        console.error(`Get all products failed: ${error}`)
      },
      () => {
        console.log(`Get all products OK`)
      }
    )
  }


  private listProductsByCatId(catId: number) {
    this.currentCategoryId = catId

    if (this.currentCategoryId != this.previousCategoryId)
      this.pageNumber = 1
    
    this.previousCategoryId = this.currentCategoryId

    
    this.productService.getProductByCatId(`page=${this.pageNumber - 1}&size=${this.pageSize}`, this.currentCategoryId).subscribe(
      (res) => {
        this.products = res.list
        this.pageNumber = res.page + 1
        this.pageSize = res.size
        this.totalElements = res.totalElements
      },
      (error) => {
        console.error(`Get all products failed: ${error}`)
      },
      () => {
        console.log(`Get all products OK`)
      }
    )
  }


  private listByName(value: string) {
    this.currentKeyword = value

    if (this.currentKeyword != this.previousKeyword)
      this.pageNumber = 1

    this.previousKeyword = this.currentKeyword

    this.productService.getProductByName(`page=${this.pageNumber - 1}&size=${this.pageSize}`, value).subscribe (
      (res) => {
        this.products = res.list
        this.pageNumber = res.page + 1
        this.pageSize = res.size
        this.totalElements = res.totalElements
      },
      (error) => {
        console.error(`Get products by name failed: ${error}`)
        this.products = []
      },
      () => {
        console.log(`get products by name OK`)
      }
    )
  }


  addToCart(product: Product) {
    this.cartService.addToCart(new CartItem(product))
  }


  changePageSize(pageSize: string) {
    this.pageSize = +pageSize
    this.pageNumber = 1
    this.listProducts()
  }

}
