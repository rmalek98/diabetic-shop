"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { productById, FREE_SHIPPING_MIN, SHIPPING_FEE } from "@/data/catalog";
import { Product } from "@/types";

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  qtyOf: (id: string) => number;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartCtx | null>(null);
const KEY = "cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [qtys, setQtys] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setQtys(JSON.parse(stored));
    } catch {}
  }, []);

  const save = useCallback((next: Record<string, number>) => {
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    return next;
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setQtys((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 99);
      return save(next);
    });
  }, [save]);

  const add = useCallback((id: string) => {
    setQtys((prev) => save({ ...prev, [id]: Math.min((prev[id] ?? 0) + 1, 99) }));
  }, [save]);

  const clear = useCallback(() => setQtys(save({})), [save]);

  const value = useMemo<CartCtx>(() => {
    const lines = Object.entries(qtys)
      .map(([id, qty]) => ({ product: productById(id), qty }))
      .filter((l): l is CartLine => !!l.product);
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      qtyOf: (id) => qtys[id] ?? 0,
      add,
      setQty,
      clear,
      open,
      setOpen,
    };
  }, [qtys, add, setQty, clear, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
