"use client";

import Link from "next/link";
import { PiShoppingBagOpenBold } from "react-icons/pi";
import { useCart } from "@/lib/cart";
import { assetPath } from "@/data/catalog";
import SearchBox from "./SearchBox";

export default function Navbar() {
  const { count, setOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center gap-3 px-4 sm:gap-5 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="DiabeticShop home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assetPath("/brand/logo-a.webp")} alt="" width={40} height={40} className="h-10 w-10 rounded-2xl ring-1 ring-border" />
          <span className="hidden font-[family-name:var(--font-display)] text-xl font-bold tracking-tight sm:block">
            Diabetic<span className="text-primary">Shop</span>
          </span>
        </Link>

        <SearchBox />

        <Link href="/shop" className="hidden shrink-0 rounded-full px-3 py-2 text-sm font-bold hover:bg-muted transition md:block">
          Shop all
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open cart, ${count} items`}
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card ring-1 ring-border hover:bg-muted transition"
        >
          <PiShoppingBagOpenBold className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-extrabold text-primary-foreground">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
