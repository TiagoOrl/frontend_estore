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
  searchMode = false
  previousCategoryId = 1
  currentCategoryId = 1

  pageNumber = 0
  pageSize = 10
  totalElements = 0

  constructor(private productService: ProductService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.listProducts()
    })
  }

  private listProducts() {

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1
    }

    this.previousCategoryId = this.currentCategoryId

    // check if 'id has been passed in the parameter URL (category:id)'
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')
    this.searchMode = this.route.snapshot.paramMap.has('keyword')

    if (this.searchMode) {
      this.listByName(this.route.snapshot.paramMap.get('keyword')!)
      return
    }


    if (hasCategoryId) {
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id')!)
      this.listProductsByCatId()
    }
    else
      this.listAllProducts()
  }


  private listAllProducts() {
    this.productService.getProductList(`page=${this.pageNumber - 1}&size=${this.pageSize}`).subscribe(
      (res) => {
        this.products = res.list
        this.pageNumber = res.page
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


  private listProductsByCatId() {
    
    this.productService.getProductByCatId(`page=${this.pageNumber - 1}&size=${this.pageSize}`, this.currentCategoryId).subscribe(
      (res) => {
        this.products = res.list
        this.pageNumber = res.page
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
    this.productService.getProductByName(`page=${this.pageNumber - 1}&size=${this.pageSize}`, value).subscribe (
      (res) => {
        this.products = res.list
        this.pageNumber = res.page
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

}
