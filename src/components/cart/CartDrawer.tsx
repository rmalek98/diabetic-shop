"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PiXBold, PiTrashBold } from "react-icons/pi";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING_MIN, money } from "@/data/catalog";
import ProductArt from "@/components/products/ProductArt";
import QtyStepper from "./QtyStepper";

export default function CartDrawer() {
  const { open, setOpen, lines, subtotal, count } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  const toFree = Math.max(0, FREE_SHIPPING_MIN - subtotal);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} inert={!open}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-[#2E2219]/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-2xl font-bold">Your cart <span className="text-muted-foreground">({count})</span></h2>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close cart" className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted transition">
            <PiXBold className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="text-6xl" aria-hidden>🧺</span>
            <p className="text-lg font-bold">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add a few tasty things and they’ll show up here.</p>
            <Link href="/shop" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground hover:brightness-110 transition">
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-5 py-3">
              <p className="text-sm font-semibold">
                {toFree > 0 ? <>You’re <b>{money(toFree)}</b> away from free shipping</> : <>🎉 You’ve unlocked free shipping!</>}
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-secondary-foreground transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_MIN) * 100)}%` }} />
              </div>
            </div>

            <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3 rounded-2xl bg-card p-2.5 ring-1 ring-border">
                  <ProductArt product={product} size="sm" className="h-20 w-20 shrink-0 rounded-xl" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link href={`/product/${product.id}`} onClick={() => setOpen(false)} className="text-sm font-bold leading-snug hover:text-primary">
                      {product.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">{product.size}</span>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QtyStepper id={product.id} name={product.name} qty={qty} />
                      <span className="font-extrabold tabular-nums">{money(product.price * qty)}</span>
                    </div>
                  </div>
                  <RemoveButton id={product.id} name={product.name} />
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-border bg-card px-5 py-4">
              <div className="flex justify-between text-base">
                <span className="font-semibold">Subtotal</span>
                <span className="font-extrabold tabular-nums">{money(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="flex h-12 w-full items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-sm hover:brightness-110 transition"
              >
                Checkout
              </Link>
              <button type="button" onClick={() => setOpen(false)} className="w-full text-sm font-semibold text-muted-foreground hover:text-foreground">
                Keep shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function RemoveButton({ id, name }: { id: string; name: string }) {
  const { setQty } = useCart();
  return (
    <button
      type="button"
      onClick={() => setQty(id, 0)}
      aria-label={`Remove ${name} from cart`}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-destructive transition"
    >
      <PiTrashBold className="h-4 w-4" />
    </button>
  );
}
