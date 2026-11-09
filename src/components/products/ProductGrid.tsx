"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PiPackageBold, PiWarningCircleBold } from "react-icons/pi";

type Catalog = Record<string, Product[]>;

const CATALOG_URL = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/products.json`;
const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`${r.status}`);
    return r.json() as Promise<Catalog>;
  });

const STOPWORDS = new Set(["and", "the", "with", "for", "free", "sugar", "low", "mix"]);

// Round-robin across categories so "All" shows a mix instead of one category first
function interleave(lists: Product[][]): Product[] {
  const out: Product[] = [];
  const max = Math.max(0, ...lists.map((l) => l.length));
  for (let i = 0; i < max; i++) for (const l of lists) if (l[i]) out.push(l[i]);
  return out;
}

function search(products: Product[], q: string): Product[] {
  const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 2 && !STOPWORDS.has(w));
  if (words.length === 0) return products;
  const need = Math.max(1, Math.ceil(words.length / 2));
  return products
    .map((p) => {
      const hay = `${p.name} ${p.brand} ${p.category}`.toLowerCase();
      return { p, score: words.filter((w) => hay.includes(w)).length };
    })
    .filter((x) => x.score >= need)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

export default function ProductGrid() {
  const params = useSearchParams();
  const cat    = params.get("cat") ?? "";
  const diet   = params.get("diet") ?? "";
  const q      = params.get("q") ?? "";

  const { data: catalog, error, isLoading } = useSWR<Catalog>(CATALOG_URL, fetcher, {
    revalidateOnFocus: false,
  });

  if (isLoading || (!catalog && !error)) return <ProductGridSkeleton />;

  let data: Product[] | undefined;
  if (catalog) {
    const seen = new Set<string>();
    data = (cat ? catalog[cat] ?? [] : interleave(Object.values(catalog)))
      .filter((p) => !seen.has(p.id) && seen.add(p.id));
    if (q)    data = search(data, q);
    if (diet) data = data.filter((p) => p.dietaryTags.includes(diet as Product["dietaryTags"][number]));
  }

  if (error) return (
    <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
      <PiWarningCircleBold className="h-10 w-10 opacity-30" />
      <p className="text-lg font-medium">Failed to load products</p>
      <p className="text-sm">Check your connection and try again.</p>
    </div>
  );

  const items = data ?? [];

  if (items.length === 0) return (
    <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
      <PiPackageBold className="h-10 w-10 opacity-30" />
      <p className="text-lg font-medium">No products found</p>
      <p className="text-sm">Try removing a filter or searching for something else.</p>
    </div>
  );

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        {isLoading ? "Updating…" : `${items.length} products`}
      </p>
      <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 transition-opacity ${isLoading ? "opacity-60" : "opacity-100"}`}>
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-8 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}
