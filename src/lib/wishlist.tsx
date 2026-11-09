"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Product } from "@/types";

interface WishlistCtx {
  items: Product[];
  toggle: (product: Product) => void;
  has: (id: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistCtx>({
  items: [],
  toggle: () => {},
  has: () => false,
  count: 0,
});

const KEY = "wishlist-v2";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setItems(JSON.parse(stored) as Product[]);
    } catch {}
  }, []);

  const toggle = useCallback((product: Product) => {
    setItems((prev) => {
      const next = prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const has = useCallback((id: string) => items.some((p) => p.id === id), [items]);

  return (
    <WishlistContext.Provider value={{ items, toggle, has, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
