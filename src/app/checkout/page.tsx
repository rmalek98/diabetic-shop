"use client";

import { useState } from "react";
import Link from "next/link";
import { PiLockSimpleBold, PiCheckCircleFill } from "react-icons/pi";
import { useCart, CartLine } from "@/lib/cart";
import { money, FREE_SHIPPING_MIN } from "@/data/catalog";
import ProductArt from "@/components/products/ProductArt";
import QtyStepper from "@/components/cart/QtyStepper";

interface PlacedOrder {
  number: string;
  firstName: string;
  lines: CartLine[];
  total: number;
}

export default function CheckoutPage() {
  const cart = useCart();
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  if (order) return <Confirmation order={order} />;

  if (cart.lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
        <span aria-hidden className="text-6xl">🧺</span>
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground">Add something tasty, then come back to check out.</p>
        <Link href="/shop" className="mt-3 rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground hover:brightness-110 transition">
          Start shopping
        </Link>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // Stripe: create a Checkout Session from a server/edge function here and redirect to its URL.
    setOrder({
      number: `DS-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      firstName: String(data.get("firstName") ?? ""),
      lines: cart.lines,
      total: cart.total,
    });
    cart.clear();
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-3xl font-bold sm:text-4xl">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={onSubmit} className="space-y-6">
          <Section title="Contact">
            <Field label="Email" name="email" type="email" autoComplete="email" full />
          </Section>

          <Section title="Delivery address">
            <Field label="First name" name="firstName" autoComplete="given-name" />
            <Field label="Last name" name="lastName" autoComplete="family-name" />
            <Field label="Street address" name="address" autoComplete="street-address" full />
            <Field label="City" name="city" autoComplete="address-level2" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="State" name="state" autoComplete="address-level1" />
              <Field label="ZIP" name="zip" autoComplete="postal-code" inputMode="numeric" />
            </div>
          </Section>

          <Section title="Payment">
            <div className="sm:col-span-2 flex items-start gap-3 rounded-2xl bg-accent p-4 text-sm text-accent-foreground">
              <PiLockSimpleBold className="mt-0.5 h-5 w-5 shrink-0" />
              <p>
                <b>Demo store — no payment is taken.</b> In the live store you’ll pay securely with Stripe on the next step.
              </p>
            </div>
          </Section>

          <button type="submit" className="h-14 w-full rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-md shadow-primary/20 transition hover:brightness-110">
            Place demo order · {money(cart.total)}
          </button>
        </form>

        <aside className="h-fit rounded-3xl bg-card p-5 ring-1 ring-border lg:sticky lg:top-24">
          <h2 className="text-xl font-bold">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {cart.lines.map(({ product, qty }) => (
              <li key={product.id} className="flex items-center gap-3">
                <ProductArt product={product} size="sm" className="h-14 w-14 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-snug">{product.name}</p>
                  <div className="mt-1"><QtyStepper id={product.id} name={product.name} qty={qty} /></div>
                </div>
                <span className="text-sm font-extrabold tabular-nums">{money(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-bold tabular-nums">{money(cart.subtotal)}</dd></div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd className="font-bold tabular-nums">{cart.shipping === 0 ? "Free" : money(cart.shipping)}</dd>
            </div>
            {cart.shipping > 0 && (
              <p className="text-xs text-muted-foreground">Free shipping on orders over ${FREE_SHIPPING_MIN}.</p>
            )}
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-bold">Total</dt><dd className="font-extrabold tabular-nums">{money(cart.total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-3xl bg-card p-5 ring-1 ring-border">
      <legend className="sr-only">{title}</legend>
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({ label, name, full, ...rest }: { label: string; name: string; full?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-bold">{label}</span>
      <input
        name={name}
        required
        {...rest}
        className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
      />
    </label>
  );
}

function Confirmation({ order }: { order: PlacedOrder }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:py-24">
      <PiCheckCircleFill className="mx-auto h-16 w-16 text-secondary-foreground" />
      <h1 className="mt-4 text-4xl font-bold">Thanks, {order.firstName || "friend"}!</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Your demo order <b className="text-foreground">{order.number}</b> is confirmed. Nothing was charged.
      </p>
      <ul className="mx-auto mt-8 max-w-sm space-y-2 rounded-3xl bg-card p-5 text-left ring-1 ring-border">
        {order.lines.map(({ product, qty }) => (
          <li key={product.id} className="flex justify-between gap-3 text-sm">
            <span><span aria-hidden>{product.emoji}</span> {product.name} × {qty}</span>
            <span className="font-bold tabular-nums">{money(product.price * qty)}</span>
          </li>
        ))}
        <li className="flex justify-between border-t border-border pt-2 font-extrabold">
          <span>Total</span><span className="tabular-nums">{money(order.total)}</span>
        </li>
      </ul>
      <Link href="/shop" className="mt-8 inline-block rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground hover:brightness-110 transition">
        Keep shopping
      </Link>
    </div>
  );
}
