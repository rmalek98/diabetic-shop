export type DietaryTag = "halal" | "kosher" | "vegan" | "gluten-free" | "organic";

export type Category =
  | "bread-bakery"
  | "sweets-desserts"
  | "drinks-beverages"
  | "snacks"
  | "meals-kits"
  | "supplements"
  | "medications"
  | "supplies"
  | "ice-cream";

export interface Nutrition {
  calories?: number;   // kcal per 100g
  carbs?: number;      // g per 100g
  sugar?: number;      // g per 100g
  fiber?: number;      // g per 100g
  protein?: number;    // g per 100g
  fat?: number;        // g per 100g
  sodium?: number;     // mg per 100g
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  description: string;
  price: number;
  image: string;
  giScore?: number;
  giLevel?: "low" | "medium" | "high";
  nutrition?: Nutrition;
  dietaryTags: DietaryTag[];
  affiliateUrl: string;
  retailer: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  products: string[]; // product ids
  distance?: number;
}
