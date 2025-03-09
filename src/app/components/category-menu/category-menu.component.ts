import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';

import { CategoryService } from 'src/app/services/category-service.service'

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {

  categories: ProductCategory[] = []

  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    this.listCategories()
  }


  private listCategories() {
    this.service.getCategoriesList("page=0&size=30").subscribe(
      (res) => {
        this.categories = res
      },
      (error) => {
        console.error(`get all categories failed: ${error}`)
      },
      () => {
        console.log('Category menu: Get categories OK')
      }
    )
  }

}
