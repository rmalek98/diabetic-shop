import { Suspense } from "react";
import ShopView from "./ShopView";

export const metadata = { title: "Shop — DiabeticShop" };

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6"><div className="h-10 w-48 animate-pulse rounded-xl bg-muted" /></div>}>
      <ShopView />
    </Suspense>
  );
}
