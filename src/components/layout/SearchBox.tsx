"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiMagnifyingGlassBold, PiArrowRightBold } from "react-icons/pi";
import { searchProducts, SUGGESTED_SEARCHES, DIET_SEARCHES } from "@/lib/search";
import { DIET_LABELS, money } from "@/data/catalog";
import ProductArt from "@/components/products/ProductArt";

export default function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const go = (q: string) => {
    setOpen(false);
    setQuery(q);
    router.push(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : "/shop");
  };

  const matches = query.trim() ? searchProducts(query).slice(0, 5) : [];

  return (
    <form
      ref={wrapRef}
      role="search"
      className="relative flex-1 max-w-xl"
      onSubmit={(e) => { e.preventDefault(); go(query); }}
      onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
    >
      <PiMagnifyingGlassBold className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        placeholder="Search bread, chocolate, halal…"
        aria-label="Search products"
        className="h-11 w-full rounded-full border border-input bg-card pl-11 pr-4 text-[15px] outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15"
      />

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-3xl border border-border bg-card p-3 shadow-[0_20px_40px_-16px_rgba(46,34,25,0.35)]">
          {query.trim() ? (
            matches.length > 0 ? (
              <ul className="space-y-1">
                {matches.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/product/${p.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-2xl p-1.5 hover:bg-muted transition"
                    >
                      <ProductArt product={p} size="sm" className="h-12 w-12 shrink-0 rounded-xl" />
                      <span className="flex-1 text-sm font-semibold leading-snug">{p.name}</span>
                      <span className="text-sm font-bold tabular-nums">{money(p.price)}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <button type="submit" className="flex w-full items-center justify-center gap-1.5 rounded-2xl p-2.5 text-sm font-bold text-primary hover:bg-muted transition">
                    See all results for “{query.trim()}” <PiArrowRightBold className="h-3.5 w-3.5" />
                  </button>
                </li>
              </ul>
            ) : (
              <p className="p-3 text-sm text-muted-foreground">No matches for “{query.trim()}” yet. Try “bread” or “chocolate”.</p>
            )
          ) : (
            <div className="space-y-3 p-1">
              <Suggestions title="Popular" items={SUGGESTED_SEARCHES.map((s) => [s, s])} onPick={go} />
              <Suggestions title="Shop by diet" items={DIET_SEARCHES.map((d) => [d, DIET_LABELS[d as keyof typeof DIET_LABELS]])} onPick={go} />
            </div>
          )}
        </div>
      )}
    </form>
  );
}

function Suggestions({ title, items, onPick }: { title: string; items: [string, string][]; onPick: (q: string) => void }) {
  return (
    <div>
      <p className="mb-1.5 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map(([q, label]) => (
          <button
            key={q}
            type="button"
            onClick={() => onPick(q)}
            className="rounded-full bg-muted px-3 py-1.5 text-sm font-semibold hover:bg-accent transition"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
