import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() { }

  applyDiscount(price:number, discount: number): number {
    let finalPrice: number = price - price * (discount / 100);
    return finalPrice;
  }

}
