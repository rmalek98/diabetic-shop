import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { fetchCatalog } from "@/lib/off";
import {
  PiArrowRightBold,
  PiBreadBold,
  PiCakeBold,
  PiIceCreamBold,
  PiCoffeeBold,
  PiBowlFoodBold,
  PiPillBold,
  PiMagnifyingGlassBold,
  PiShieldCheckBold,
  PiSlidersHorizontalBold,
} from "react-icons/pi";

const categories = [
  { id: "bread-bakery",     label: "Bread & Bakery",  Icon: PiBreadBold,    color: "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/20" },
  { id: "sweets-desserts",  label: "Sweets",          Icon: PiCakeBold,     color: "bg-pink-500/10 text-pink-600 group-hover:bg-pink-500/20" },
  { id: "ice-cream",        label: "Ice Cream",       Icon: PiIceCreamBold, color: "bg-sky-500/10 text-sky-600 group-hover:bg-sky-500/20" },
  { id: "drinks-beverages", label: "Drinks",          Icon: PiCoffeeBold,   color: "bg-cyan-500/10 text-cyan-600 group-hover:bg-cyan-500/20" },
  { id: "snacks",           label: "Snacks",          Icon: PiBowlFoodBold, color: "bg-orange-500/10 text-orange-600 group-hover:bg-orange-500/20" },
  { id: "meals-kits",       label: "Meal Kits",       Icon: PiBowlFoodBold, color: "bg-green-500/10 text-green-600 group-hover:bg-green-500/20" },
  { id: "medications",      label: "Nutrition Shakes", Icon: PiPillBold,     color: "bg-violet-500/10 text-violet-600 group-hover:bg-violet-500/20" },
];

const steps = [
  { Icon: PiMagnifyingGlassBold, title: "Find what you need", desc: "Browse by category or search a specific product — every pick is lower in sugar." },
  { Icon: PiSlidersHorizontalBold, title: "Filter your way", desc: "Halal, Kosher, Vegan, Gluten-Free — apply filters that match your lifestyle." },
  { Icon: PiShieldCheckBold, title: "Know what you're eating", desc: "See nutrition facts from the package and an estimated GI for each product." },
];

export default async function HomePage() {
  const catalog = await fetchCatalog();
  const featured = Object.values(catalog).flatMap((list) => list.slice(0, 2));

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white">
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-teal-400 uppercase mb-4">
            Lower-sugar shopping
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-5">
            Shop for diabetes,{" "}
            <span className="text-teal-400">made simple</span>
          </h1>
          <p className="text-slate-300 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Low-sugar bread, sweets, drinks, and snacks — real products with real nutrition facts.
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-white gap-2 px-8 h-12 text-base font-semibold rounded-xl shadow-lg shadow-teal-500/20">
              Browse products <PiArrowRightBold className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border/40 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map(({ Icon, title, desc }, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="h-4.5 w-4.5 text-teal-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-xl font-bold mb-2">What are you looking for?</h2>
        <p className="text-sm text-muted-foreground mb-6">Pick a category to get started</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map(({ id, label, Icon, color }) => (
            <Link
              key={id}
              href={`/shop?cat=${id}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 hover:border-border hover:shadow-sm transition-all group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground leading-tight transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Featured products</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Lower-sugar picks from our catalog</p>
          </div>
          <Link href="/shop" className="text-sm text-teal-600 hover:text-teal-500 font-medium flex items-center gap-1">
            See all <PiArrowRightBold className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.slice(0, 12).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
