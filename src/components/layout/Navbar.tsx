"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useWishlist } from "@/lib/wishlist";
import {
  PiHeartBold,
  PiMagnifyingGlassBold,
  PiListBold,
  PiXBold,
} from "react-icons/pi";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { count: wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-sm">
              D+
            </div>
            <span className="font-bold text-base tracking-tight hidden sm:block">
              Diabetic<span className="text-teal-500">Shop</span>
            </span>
          </Link>

          {/* Search */}
          <form
            className="flex-1"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              const q = query.trim();
              router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
              setMobileOpen(false);
            }}
          >
            <div className="relative">
              <PiMagnifyingGlassBold className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="pl-9 bg-muted/50 border-0 focus-visible:ring-1 h-9"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                <PiHeartBold className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <PiXBold className="h-5 w-5" /> : <PiListBold className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="pb-3 sm:hidden">
            <div className="flex flex-col gap-1 text-sm">
              {[
                ["All Products", "/shop"],
                ["Bread & Bakery", "/shop?cat=bread-bakery"],
                ["Sweets", "/shop?cat=sweets-desserts"],
                ["Ice Cream", "/shop?cat=ice-cream"],
                ["Drinks", "/shop?cat=drinks-beverages"],
                ["Snacks", "/shop?cat=snacks"],
                ["Meal Kits", "/shop?cat=meals-kits"],
                ["Nutrition Shakes", "/shop?cat=medications"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
