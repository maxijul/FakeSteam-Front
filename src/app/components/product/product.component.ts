import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/models';
import { UtilityService } from '../../services/utility.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() view: 'grid' | 'list' | 'currentCartItem' | 'previousCartItem' = 'grid';
  @Input() product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    productCategory: {
      id: 1,
      category: ''
    },
    offer: {
      id: 1,
      title: '',
      discount: 0
    },
    imageName: ''
  }

  constructor(public utilityService: UtilityService) { }

  ngOnInit(): void {
  }

}
