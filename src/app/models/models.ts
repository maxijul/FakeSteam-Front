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