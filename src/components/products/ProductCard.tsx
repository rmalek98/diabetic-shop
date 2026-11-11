import Link from "next/link";
import { money, netCarbs } from "@/data/catalog";
import { Product } from "@/types";
import ProductArt from "./ProductArt";
import AddToCart from "@/components/cart/AddToCart";

export default function ProductCard({ product }: { product: Product }) {
  const href = `/product/${product.id}`;
  return (
    <article className="group flex flex-col rounded-3xl bg-card p-2.5 shadow-[0_1px_0_rgba(46,34,25,0.04),0_8px_24px_-12px_rgba(46,34,25,0.18)] ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(46,34,25,0.25)]">
      <Link href={href} className="relative block" tabIndex={-1} aria-hidden>
        <ProductArt product={product} className="aspect-[4/3] rounded-2xl transition group-hover:scale-[1.01]" />
        {product.badge && (
          <span className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${product.badge === "New" ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground"}`}>
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1 px-1.5 pb-1 pt-3">
        <Link href={href} className="font-bold leading-snug line-clamp-2 hover:text-primary transition-colors">
          {product.name}
        </Link>
        <p className="text-xs text-muted-foreground">{product.size}</p>
        <p className="mt-1 flex flex-wrap gap-x-2 text-xs font-semibold text-secondary-foreground">
          <span>{netCarbs(product)}g net carbs</span>
          <span aria-hidden className="text-border">•</span>
          <span>{product.nutrition.sugar}g sugar</span>
        </p>
        <div className="mt-auto space-y-2.5 pt-3">
          <span className="block text-lg font-extrabold tabular-nums">{money(product.price)}</span>
          <AddToCart id={product.id} name={product.name} />
        </div>
      </div>
    </article>
  );
}
