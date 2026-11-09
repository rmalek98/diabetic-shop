"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  PiSlidersHorizontalBold,
  PiStorefrontBold,
  PiBreadBold,
  PiCakeBold,
  PiIceCreamBold,
  PiCoffeeBold,
  PiBowlFoodBold,
  PiPillBold,
  PiMosqueBold,
  PiStarOfDavidBold,
  PiPlantBold,
  PiGrainsBold,
  PiFlowerBold,
} from "react-icons/pi";

const categories = [
  { id: "all",              label: "All Products",    Icon: PiStorefrontBold },
  { id: "bread-bakery",     label: "Bread & Bakery",  Icon: PiBreadBold },
  { id: "sweets-desserts",  label: "Sweets",          Icon: PiCakeBold },
  { id: "ice-cream",        label: "Ice Cream",       Icon: PiIceCreamBold },
  { id: "drinks-beverages", label: "Drinks",          Icon: PiCoffeeBold },
  { id: "snacks",           label: "Snacks",          Icon: PiBowlFoodBold },
  { id: "meals-kits",       label: "Meal Kits",       Icon: PiBowlFoodBold },
  { id: "medications",      label: "Nutrition Shakes", Icon: PiPillBold },
];

const dietaryFilters = [
  { id: "halal",       label: "Halal",       Icon: PiMosqueBold },
  { id: "kosher",      label: "Kosher",      Icon: PiStarOfDavidBold },
  { id: "vegan",       label: "Vegan",       Icon: PiPlantBold },
  { id: "gluten-free", label: "Gluten-Free", Icon: PiGrainsBold },
  { id: "organic",     label: "Organic",     Icon: PiFlowerBold },
];

export default function FilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const activeCategory = params.get("cat") ?? "all";
  const activeDiet = params.get("diet") ?? "";

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "all" || value === "") next.delete(key);
    else next.set(key, value);
    router.push(`/shop?${next.toString()}`);
  }

  return (
    <div className="space-y-3 mb-8">
      {/* Category pills */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {categories.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setParam("cat", id)}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
              activeCategory === id
                ? "bg-teal-500 text-white border-teal-500 shadow-sm"
                : "bg-muted/50 text-muted-foreground border-border/50 hover:border-teal-500/40 hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {/* Dietary filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mr-1">
          <PiSlidersHorizontalBold className="h-3.5 w-3.5" />
          <span>Dietary:</span>
        </div>
        {dietaryFilters.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setParam("diet", activeDiet === id ? "" : id)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all border",
              activeDiet === id
                ? "bg-teal-500/10 text-teal-700 border-teal-500/40"
                : "bg-transparent text-muted-foreground border-border/50 hover:border-teal-500/40 hover:text-foreground"
            )}
          >
            <Icon className="h-3 w-3 shrink-0" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
