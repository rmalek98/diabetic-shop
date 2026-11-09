"use client";

import { useWishlist } from "@/lib/wishlist";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PiHeartBold, PiArrowLeftBold } from "react-icons/pi";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/shop">
          <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label="Back to shop">
            <PiArrowLeftBold className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Wishlist</h1>
          <p className="text-muted-foreground text-sm">{items.length} saved items</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-muted-foreground gap-4">
          <PiHeartBold className="h-12 w-12 opacity-20" />
          <p className="text-lg font-medium">Your wishlist is empty</p>
          <Link href="/shop">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
