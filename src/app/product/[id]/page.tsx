import Link from "next/link";
import { notFound } from "next/navigation";
import { PiArrowLeftBold } from "react-icons/pi";
import { PRODUCTS, productById, categoryById, netCarbs, money, DIET_LABELS } from "@/data/catalog";
import ProductArt from "@/components/products/ProductArt";
import ProductCard from "@/components/products/ProductCard";
import AddToCart from "@/components/cart/AddToCart";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productById(id);
  return { title: product ? `${product.name} — DiabeticShop` : "DiabeticShop" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productById(id);
  if (!product) notFound();

  const category = categoryById(product.category);
  const n = product.nutrition;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const highlights = [
    { value: `${netCarbs(product)}g`, label: "net carbs" },
    { value: `${n.sugar}g`, label: "sugar" },
    { value: `${n.protein}g`, label: "protein" },
    { value: `${n.fiber}g`, label: "fiber" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link href={`/shop?cat=${category.id}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground">
        <PiArrowLeftBold className="h-4 w-4" /> {category.label}
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2 md:gap-12">
        <ProductArt product={product} size="lg" priority className="aspect-square rounded-[2rem]" />

        <div className="flex flex-col">
          {product.badge && (
            <span className="mb-3 w-fit rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground">{product.badge}</span>
          )}
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-1 text-muted-foreground">{product.size}</p>
          <p className="mt-4 text-3xl font-extrabold tabular-nums">{money(product.price)}</p>

          <p className="mt-4 text-lg leading-relaxed">{product.description}</p>

          <ul className="mt-6 grid grid-cols-4 gap-2">
            {highlights.map((h) => (
              <li key={h.label} className="rounded-2xl bg-secondary px-2 py-3 text-center">
                <span className="block text-xl font-extrabold text-secondary-foreground">{h.value}</span>
                <span className="text-xs font-semibold text-secondary-foreground/80">{h.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">Per serving ({product.serving})</p>

          <div className="mt-6 max-w-sm">
            <AddToCart id={product.id} name={product.name} size="lg" />
          </div>

          <dl className="mt-8 divide-y divide-border rounded-3xl bg-card px-5 ring-1 ring-border">
            <Row label="Serving size" value={product.serving} />
            <Row label="Calories" value={`${n.calories}`} />
            <Row label="Total carbs" value={`${n.carbs}g`} />
            <Row label="Fiber" value={`${n.fiber}g`} />
            <Row label="Sugar" value={`${n.sugar}g`} />
            <Row label="Protein" value={`${n.protein}g`} />
            {product.diet.length > 0 && (
              <Row label="Suitable for" value={product.diet.map((d) => DIET_LABELS[d]).join(" · ")} />
            )}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">More {category.label.toLowerCase()}</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-3 text-sm">
      <dt className="font-semibold text-muted-foreground">{label}</dt>
      <dd className="text-right font-bold">{value}</dd>
    </div>
  );
}
