import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  view: 'grid' | 'list' = 'list';
  // htl = high to low; lth = low to high
  sortBy: 'default' | 'htl' | 'lth' = 'default'
  constructor() { }

  ngOnInit(): void {
  }

}
