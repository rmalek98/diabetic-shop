import Link from "next/link";
import { CATEGORIES } from "@/data/catalog";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-muted/60">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span aria-hidden className="grid h-8 w-8 place-items-center rounded-xl bg-primary">🥕</span>
              <span className="font-[family-name:var(--font-display)] text-lg font-bold">
                Diabetic<span className="text-primary">Shop</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Lower-sugar food that still tastes like a treat. Delivered to your door.
            </p>
          </div>
          <nav aria-label="Shop">
            <h2 className="mb-3 font-[family-name:var(--font-sans)] text-sm font-extrabold">Shop</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground sm:grid-cols-1">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link href={`/shop?cat=${c.id}`} className="hover:text-foreground transition-colors">{c.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="More">
            <h2 className="mb-3 font-[family-name:var(--font-sans)] text-sm font-extrabold">More</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/meals" className="hover:text-foreground transition-colors">Meal ideas</Link></li>
              <li><Link href="/shop?sort=carbs" className="hover:text-foreground transition-colors">Lowest net carbs</Link></li>
              <li><Link href="/checkout" className="hover:text-foreground transition-colors">Checkout</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 space-y-2 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
          <p>
            <b className="text-foreground/80">Demo store.</b> Products, prices and nutrition values are illustrative samples
            for previewing the shopping experience. No orders are fulfilled and no payments are taken.
          </p>
          <p>
            <b className="text-foreground/80">Not medical advice.</b> Talk to your doctor or dietitian before changing your diet or medications.
          </p>
          <p>© 2026 DiabeticShop</p>
        </div>
      </div>
    </footer>
  );
}
