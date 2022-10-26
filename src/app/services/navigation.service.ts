import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../models/models';
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

}
