import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { 

  }

  ngOnInit(): void {
  }

  searchByText(name: string) {
    console.log(`search = ${name}`)
    this.router.navigateByUrl(`/search/${name}`)
  }
}
