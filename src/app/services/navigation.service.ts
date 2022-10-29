import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category, Order, Payment, PaymentMethod, User } from '../models/models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseUrl = 'https://localhost:7053/api/Shopping/';


  constructor(private http: HttpClient) { }

  getCategoryList() {
    let url = this.baseUrl + 'GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories: any) =>
        categories.map((category: any) => {
          let mappedCategory: Category = {
            id: category.id,
            category: category.category,
          };
          console.log(mappedCategory);
          return mappedCategory;
        })
      )
    );
  }

  getProducts(category: string, count: number) {
    return this.http.get<any[]>(this.baseUrl + 'GetProducts', {
      params: new HttpParams()
        .set('category', category)
        .set('count', count)
    })
  }

  getProduct(id: number){
    let url = this.baseUrl + 'GetProduct/' + id;
    return this.http.get(url)
  }

  registerUser(user: User){
    let url = this.baseUrl + "RegisterUser";
    return this.http.post(url, user, { responseType: 'text' });
  }

  loginUser(email: string, password: string) {
    let url = this.baseUrl + "LoginUser";
    return this.http.post(
      url,
      { Email: email, Password: password },
      { responseType: 'text' }
    )
  }

  submitReview(userid: number, productid: number, review: string) {
    let obj: any = {
      User: {
        Id: userid
      },
      Product: {
        Id: productid
      },
      Value: review
    }

    let url = this.baseUrl + 'InsertReview';
    return this.http.post(url, obj, { responseType: 'text'})
  }

  getAllReviewsOfProduct(productId: number) {
    let url = this.baseUrl + 'GetProductReviews/' + productId;
    return this.http.get(url);
  }

  addToCart(userId: number, productId: number) {
    let url = `${this.baseUrl}InsertCartItem/${userId}/${productId}`

    return this.http.post(url, null, { responseType: 'text' })
  }

  getActiveCartOfUser(userId: number) {
    let url = this.baseUrl + 'GetActiveCartOfUser/' + userId
    return this.http.get(url);
  }

  getAllPreviousCarts(userId: number) {
    let url = this.baseUrl + 'GetAllPreviousCartsOfUser/' + userId;
    return this.http.get(url);
  }

  getPaymentMethods() {
    let url = this.baseUrl + "GetPaymentMethods";
    return this.http.get<PaymentMethod[]>(url)
  }

  insertPayment(payment: Payment) {
    return this.http.post(this.baseUrl + 'InsertPayment', payment, { responseType: 'text'})
  }

  insertOrder(order: Order) {
    return this.http.post(this.baseUrl + 'InsertOrder', order)
  }

}
