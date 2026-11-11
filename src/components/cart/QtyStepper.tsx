"use client";

import { PiMinusBold, PiPlusBold } from "react-icons/pi";
import { useCart } from "@/lib/cart";

export default function QtyStepper({ id, name, qty }: { id: string; name: string; qty: number }) {
  const { setQty } = useCart();
  return (
    <div className="flex h-8 w-fit items-center rounded-full bg-muted font-bold">
      <button type="button" onClick={() => setQty(id, qty - 1)} aria-label={`Remove one ${name}`} className="grid h-8 w-8 place-items-center rounded-full hover:bg-accent transition">
        <PiMinusBold className="h-3.5 w-3.5" />
      </button>
      <span className="w-6 text-center text-sm tabular-nums">{qty}</span>
      <button type="button" onClick={() => setQty(id, qty + 1)} aria-label={`Add one more ${name}`} className="grid h-8 w-8 place-items-center rounded-full hover:bg-accent transition">
        <PiPlusBold className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
