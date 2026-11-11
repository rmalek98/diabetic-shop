"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, PRODUCTS, netCarbs } from "@/data/catalog";
import { searchProducts, SUGGESTED_SEARCHES } from "@/lib/search";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price: low to high", fn: (a: Product, b: Product) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a: Product, b: Product) => b.price - a.price },
  carbs: { label: "Lowest net carbs", fn: (a: Product, b: Product) => netCarbs(a) - netCarbs(b) },
} as const;
type SortKey = keyof typeof SORTS;

export default function ShopView() {
  const params = useSearchParams();
  const router = useRouter();
  const cat = params.get("cat") ?? "";
  const q = params.get("q") ?? "";
  const sort = (params.get("sort") ?? "featured") as SortKey;

  const category = CATEGORIES.find((c) => c.id === cat);
  let products = category ? PRODUCTS.filter((p) => p.category === category.id) : PRODUCTS;
  if (q) products = searchProducts(q, products);
  if (sort in SORTS && sort !== "featured") products = [...products].sort(SORTS[sort].fn);

  const hrefWith = (next: Record<string, string>) => {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) v ? sp.set(k, v) : sp.delete(k);
    const s = sp.toString();
    return s ? `/shop?${s}` : "/shop";
  };

  const title = q ? `Results for “${q}”` : category ? category.label : "Shop everything";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex items-center gap-3">
        {category && <span aria-hidden className="text-4xl">{category.emoji}</span>}
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      </div>
      {q && (
        <Link href={hrefWith({ q: "" })} className="mt-1 inline-block text-sm font-semibold text-primary hover:underline">
          Clear search
        </Link>
      )}

      <nav aria-label="Categories" className="-mx-4 mt-6 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2">
          <Pill href={hrefWith({ cat: "" })} active={!category}>All</Pill>
          {CATEGORIES.map((c) => (
            <Pill key={c.id} href={hrefWith({ cat: c.id })} active={c.id === category?.id}>
              <span aria-hidden>{c.emoji}</span> {c.label}
            </Pill>
          ))}
        </div>
      </nav>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-muted-foreground">{products.length} {products.length === 1 ? "item" : "items"}</p>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <span className="hidden text-muted-foreground sm:inline">Sort by</span>
          <select
            value={sort in SORTS ? sort : "featured"}
            onChange={(e) => router.push(hrefWith({ sort: e.target.value === "featured" ? "" : e.target.value }))}
            className="h-10 rounded-full border border-input bg-card px-4 font-semibold outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
          >
            {Object.entries(SORTS).map(([k, { label }]) => <option key={k} value={k}>{label}</option>)}
          </select>
        </label>
      </div>

      {products.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl bg-card px-6 py-14 text-center ring-1 ring-border">
          <span aria-hidden className="text-5xl">🔍</span>
          <p className="text-lg font-bold">We don’t carry that yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">Try one of these popular searches instead:</p>
          <div className="mt-1 flex flex-wrap justify-center gap-2">
            {SUGGESTED_SEARCHES.map((s) => (
              <Link key={s} href={`/shop?q=${encodeURIComponent(s)}`} className="rounded-full bg-muted px-4 py-2 text-sm font-semibold hover:bg-accent transition">
                {s}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Pill({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-bold transition ${active ? "bg-foreground text-background" : "bg-card ring-1 ring-border hover:bg-muted"}`}
    >
      {children}
    </Link>
  );
}
