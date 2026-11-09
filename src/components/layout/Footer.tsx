import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 mt-16 bg-muted/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-xs">D+</div>
              <span className="font-bold text-sm">DiabeticShop</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Diabetic-friendly food and drinks — real products, real nutrition facts.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/shop?cat=bread-bakery" className="hover:text-foreground transition-colors">Bread & Bakery</Link></li>
              <li><Link href="/shop?cat=snacks" className="hover:text-foreground transition-colors">Snacks</Link></li>
              <li><Link href="/shop?cat=medications" className="hover:text-foreground transition-colors">Nutrition Shakes</Link></li>
              <li><Link href="/meals" className="hover:text-foreground transition-colors">Meal Ideas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Dietary</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop?diet=halal" className="hover:text-foreground transition-colors">Halal</Link></li>
              <li><Link href="/shop?diet=kosher" className="hover:text-foreground transition-colors">Kosher</Link></li>
              <li><Link href="/shop?diet=vegan" className="hover:text-foreground transition-colors">Vegan</Link></li>
              <li><Link href="/shop?diet=gluten-free" className="hover:text-foreground transition-colors">Gluten-Free</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 space-y-2 text-xs text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground/80">Not medical advice.</strong> Information here is for general
            reference only. Talk to your doctor or dietitian before changing your diet or medications.
          </p>
          <p>
            GI values are estimates calculated from package nutrition data, not lab-tested. Nutrition and
            dietary labels come from product listings and may be outdated — always check the package.
          </p>
          <p>
            Product data and images from{" "}
            <a href="https://world.openfoodfacts.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              Open Food Facts
            </a>
            , available under the{" "}
            <a href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              ODbL
            </a>{" "}
            (images{" "}
            <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              CC BY-SA
            </a>
            ). Brand names and trademarks belong to their owners; DiabeticShop is not affiliated with or
            endorsed by them.
          </p>
          <p>© 2026 DiabeticShop · Demo preview</p>
        </div>
      </div>
    </footer>
  );
}
