"use client";

import { useCart } from "@/lib/cart";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";

export default function AddToCart({ id, name, size = "sm" }: { id: string; name: string; size?: "sm" | "lg" }) {
  const { qtyOf, add, setQty } = useCart();
  const qty = qtyOf(id);
  const h = size === "lg" ? "h-12 text-base" : "h-9 text-sm";

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => add(id)}
        aria-label={`Add ${name} to cart`}
        className={`${h} w-full rounded-full bg-primary px-4 font-bold text-primary-foreground inline-flex items-center justify-center gap-1.5 shadow-sm transition hover:brightness-110 active:scale-[0.97]`}
      >
        <PiPlusBold className="h-4 w-4" /> Add
      </button>
    );
  }

  return (
    <div className={`${h} w-full rounded-full bg-secondary text-secondary-foreground flex items-center justify-between px-1 font-bold`}>
      <button
        type="button"
        onClick={() => setQty(id, qty - 1)}
        aria-label={`Remove one ${name}`}
        className="aspect-square h-full rounded-full grid place-items-center hover:bg-white/70 transition"
      >
        <PiMinusBold className="h-4 w-4" />
      </button>
      <span aria-live="polite">{qty} in cart</span>
      <button
        type="button"
        onClick={() => add(id)}
        aria-label={`Add one more ${name}`}
        className="aspect-square h-full rounded-full grid place-items-center hover:bg-white/70 transition"
      >
        <PiPlusBold className="h-4 w-4" />
      </button>
    </div>
  );
}
