import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() view: 'grid' | 'list' = 'grid';

  constructor() { }

  ngOnInit(): void {
  }

}
