import { Suspense } from "react";
import FilterBar from "@/components/products/FilterBar";
import ProductGrid from "@/components/products/ProductGrid";

export const metadata = { title: "Shop — DiabeticShop" };

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">All Products</h1>
      <p className="text-muted-foreground mb-8">
        Diabetic-friendly food and drinks — real products with nutrition facts and GI estimates.
      </p>
      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>
      <Suspense fallback={null}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
