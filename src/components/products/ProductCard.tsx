"use client";

import { useState } from "react";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/wishlist";
import { CATEGORY_FALLBACK } from "@/lib/constants";
import {
  PiHeartBold,
  PiHeartFill,
  PiArrowSquareOutBold,
  PiMosqueBold,
  PiStarOfDavidBold,
  PiPlantBold,
  PiGrainsBold,
  PiFlowerBold,
  PiSealCheckFill,
} from "react-icons/pi";

const GI_COLORS = {
  low:    "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  medium: "bg-amber-500/10   text-amber-700   border-amber-500/20",
  high:   "bg-red-500/10    text-red-700     border-red-500/20",
};

const DIETARY_META: Record<string, { Icon: React.ElementType; color: string; label: string }> = {
  halal:        { Icon: PiMosqueBold,      color: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20", label: "Halal" },
  kosher:       { Icon: PiStarOfDavidBold, color: "bg-blue-500/10    text-blue-700    border-blue-500/20",    label: "Kosher" },
  vegan:        { Icon: PiPlantBold,       color: "bg-lime-500/10    text-lime-700    border-lime-500/20",    label: "Vegan" },
  "gluten-free":{ Icon: PiGrainsBold,      color: "bg-amber-500/10   text-amber-700   border-amber-500/20",   label: "GF" },
  organic:      { Icon: PiFlowerBold,      color: "bg-teal-500/10    text-teal-700    border-teal-500/20",    label: "Organic" },
};

export default function ProductCard({ product }: { product: Product }) {
  const hasPrice = product.price > 0;
  const { nutrition } = product;
  const { toggle, has } = useWishlist();
  const wishlisted = has(product.id);
  const fallback = CATEGORY_FALLBACK[product.category] ?? CATEGORY_FALLBACK["snacks"];
  const [imgSrc, setImgSrc] = useState(product.image);

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-200 flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => { if (imgSrc !== fallback) setImgSrc(fallback); }}
          className="absolute inset-0 w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500 text-white">
              <PiSealCheckFill className="h-2.5 w-2.5" /> Best Seller
            </span>
          )}
          {product.isFeatured && !product.isBestSeller && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-500 text-white">Featured</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggle(product)}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 backdrop-blur flex items-center justify-center transition-all shadow-sm hover:bg-background`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlisted
            ? <PiHeartFill className="h-3.5 w-3.5 text-red-500" />
            : <PiHeartBold className="h-3.5 w-3.5 text-muted-foreground" />
          }
        </button>

        {/* GI Score */}
        {product.giScore !== undefined && product.giLevel && (
          <div className={`absolute bottom-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded border backdrop-blur-sm ${GI_COLORS[product.giLevel]}`}>
            Est. GI {product.giScore} · {product.giLevel.charAt(0).toUpperCase() + product.giLevel.slice(1)}
          </div>
        )}
      </div>

      <CardContent className="p-3 space-y-2 flex flex-col flex-1">
        {/* Brand */}
        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider truncate">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {product.name}
        </h3>

        {/* Nutrition grid — per 100g */}
        {nutrition && (nutrition.calories !== undefined || nutrition.carbs !== undefined) && (
          <div className="grid grid-cols-4 gap-1 py-1.5 px-2 rounded-lg bg-muted/50 border border-border/30">
            {[
              { label: "Cal", value: nutrition.calories, unit: "" },
              { label: "Carbs", value: nutrition.carbs, unit: "g" },
              { label: "Sugar", value: nutrition.sugar, unit: "g" },
              { label: "Protein", value: nutrition.protein, unit: "g" },
            ].map(({ label, value, unit }) =>
              value !== undefined ? (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-[11px] font-bold leading-none">{value}{unit}</span>
                  <span className="text-[9px] text-muted-foreground mt-0.5 leading-none">{label}</span>
                </div>
              ) : null
            )}
          </div>
        )}

        {/* Dietary tags */}
        {product.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.dietaryTags.slice(0, 3).map((tag) => {
              const meta = DIETARY_META[tag];
              if (!meta) return null;
              const { Icon, color, label } = meta;
              return (
                <span key={tag} className={`flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded border font-medium ${color}`}>
                  <Icon className="h-2.5 w-2.5" />
                  {label}
                </span>
              );
            })}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <div>
            {hasPrice ? (
              <span className="text-base font-bold">${product.price.toFixed(2)}</span>
            ) : (
              <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">Check Price</span>
            )}
            <span className="text-[10px] text-muted-foreground block leading-none mt-0.5">
              via {product.retailer}
            </span>
          </div>
          <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="h-7 text-xs bg-teal-500 hover:bg-teal-600 text-white gap-1">
              Shop <PiArrowSquareOutBold className="h-3 w-3" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
