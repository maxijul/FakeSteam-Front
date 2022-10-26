export interface Category{
   id: number;
   category: string;
}

export interface SuggestedProduct {
   banerImage: string;
   category: Category;
}

export interface NavigationItem {
   category: string[];
}

//* Region Product

export interface Offer {
   id: number;
   title: string;
   discount: number;
}

export interface Category {
   id: number;
   category: string;
}

export interface Product {
   id: number;
   title: string;
   description: string;
   productCategory: Category;
   offer: Offer;
   price: number;
   quantity: number;
   imageName: string;
}

//* endregion