export type DietaryTag = "halal" | "kosher" | "vegan" | "gluten-free" | "organic";

export type CategoryId = "bakery" | "sweets" | "frozen" | "drinks" | "snacks" | "pantry" | "meals";

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  tint: string;
}

export interface Nutrition {
  calories: number;
  carbs: number;
  fiber: number;
  sugar: number;
  protein: number;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  size: string;
  emoji: string;
  image?: string;
  description: string;
  serving: string;
  nutrition: Nutrition;
  diet: DietaryTag[];
  keywords: string[];
  badge?: "Bestseller" | "New";
}
