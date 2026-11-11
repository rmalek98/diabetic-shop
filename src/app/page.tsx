import Link from "next/link";
import { PiArrowRightBold, PiTruckBold, PiLeafBold, PiArrowsClockwiseBold } from "react-icons/pi";
import { CATEGORIES, PRODUCTS, FREE_SHIPPING_MIN, productById } from "@/data/catalog";
import ProductArt from "@/components/products/ProductArt";
import ProductCard from "@/components/products/ProductCard";

const HERO_FOODS = ["seeded-keto-loaf", "dark-chocolate-stevia", "vanilla-keto-ice-cream", "lemon-sparkling-water", "lightly-salted-popcorn", "shirataki-fettuccine"];

const PERKS = [
  { Icon: PiTruckBold, text: `Free shipping over $${FREE_SHIPPING_MIN}` },
  { Icon: PiLeafBold, text: "Net carbs & sugar on every item" },
  { Icon: PiArrowsClockwiseBold, text: "Easy swaps for your favorites" },
];

export default function HomePage() {
  const bestsellers = PRODUCTS.filter((p) => p.badge === "Bestseller");
  const newArrivals = PRODUCTS.filter((p) => p.badge === "New");

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-accent px-6 py-10 sm:px-12 sm:py-16">
          <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#FFD49A]/60" />
          <div aria-hidden className="absolute -bottom-20 right-24 h-56 w-56 rounded-full bg-[#F9DCE3]/70" />

          <div className="relative grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-card/80 px-3 py-1 text-sm font-bold text-accent-foreground">
                <span aria-hidden>✨</span> Lower sugar, full flavor
              </p>
              <h1 className="text-4xl font-bold leading-[1.05] sm:text-6xl">
                The treats you love, <span className="text-primary italic">without the spike.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-accent-foreground/80">
                Bread, sweets, snacks and easy dinners — picked for steadier blood sugar and delivered to your door.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/shop" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 font-bold text-primary-foreground shadow-md shadow-primary/20 transition hover:brightness-110">
                  Start shopping <PiArrowRightBold className="h-4 w-4" />
                </Link>
                <Link href="/meals" className="inline-flex h-12 items-center rounded-full bg-card px-6 font-bold ring-1 ring-border transition hover:bg-muted">
                  Get meal ideas
                </Link>
              </div>
            </div>

            <div aria-hidden className="mx-auto hidden w-full max-w-sm grid-cols-3 gap-3 sm:gap-4 md:grid">
              {HERO_FOODS.map((id, i) => (
                <ProductArt
                  key={id}
                  product={productById(id)!}
                  priority
                  className={`aspect-square rounded-3xl ring-4 ring-card shadow-[0_10px_24px_-14px_rgba(46,34,25,0.5)] ${i % 2 ? "translate-y-4" : ""} ${i % 3 === 1 ? "rotate-3" : "-rotate-2"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-5 grid gap-2 sm:grid-cols-3">
          {PERKS.map(({ Icon, text }) => (
            <li key={text} className="flex items-center justify-center gap-2 rounded-2xl bg-card px-4 py-3 text-sm font-semibold ring-1 ring-border">
              <Icon className="h-5 w-5 text-secondary-foreground" /> {text}
            </li>
          ))}
        </ul>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <h2 className="text-3xl font-bold">What are you craving?</h2>
        <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-7">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/shop?cat=${c.id}`}
              className="group flex flex-col items-center gap-1.5 rounded-2xl px-1 py-3 text-center transition hover:-translate-y-1 sm:gap-3 sm:rounded-3xl sm:p-5"
              style={{ backgroundColor: c.tint }}
            >
              <span aria-hidden className="text-3xl transition group-hover:scale-110 group-hover:-rotate-6 sm:text-5xl">{c.emoji}</span>
              <span className="text-xs font-bold leading-tight sm:text-base">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <ProductRow title="Customer favorites" subtitle="The swaps people keep coming back for" products={bestsellers} />

      {/* Meal ideas teaser */}
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <Link href="/meals" className="group flex flex-col items-start gap-5 rounded-[2rem] bg-secondary p-8 sm:flex-row sm:items-center sm:p-10">
          <span aria-hidden className="text-6xl">🥗</span>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-secondary-foreground sm:text-3xl">Not sure what to make tonight?</h2>
            <p className="mt-1 text-secondary-foreground/80">Simple breakfast, lunch and dinner ideas — with everything you need one tap away.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-3 font-bold text-secondary-foreground transition group-hover:gap-3">
            Browse meal ideas <PiArrowRightBold className="h-4 w-4" />
          </span>
        </Link>
      </section>

      <ProductRow title="Just in" subtitle="Fresh additions to the shelf" products={newArrivals} />
      <div className="h-16" />
    </div>
  );
}

function ProductRow({ title, subtitle, products }: { title: string; subtitle: string; products: typeof PRODUCTS }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-1 text-muted-foreground">{subtitle}</p>
        </div>
        <Link href="/shop" className="hidden shrink-0 items-center gap-1 font-bold text-primary hover:gap-2 transition-all sm:inline-flex">
          Shop all <PiArrowRightBold className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
