import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PiSunBold,
  PiBowlFoodBold,
  PiMoonBold,
  PiCookieBold,
  PiArrowRightBold,
  PiClockBold,
  PiFireBold,
  PiLeafBold,
} from "react-icons/pi";

export const metadata = { title: "Meal Inspiration — DiabeticShop" };

interface Meal {
  name: string;
  description: string;
  time: string;
  kcal: string;
  gi: "Low GI" | "Medium GI";
  tags: string[];
  ingredients: { label: string; shopQuery: string }[];
  tip?: string;
}

const meals: Record<string, { icon: React.ElementType; color: string; bg: string; items: Meal[] }> = {
  Breakfast: {
    icon: PiSunBold,
    color: "text-amber-500",
    bg:    "bg-amber-500/10 border-amber-500/20",
    items: [
      {
        name: "Almond Flour Pancakes",
        description: "Fluffy, grain-free pancakes topped with sugar-free maple syrup and fresh berries. High protein, very low GI.",
        time: "15 min", kcal: "~280 kcal", gi: "Low GI",
        tags: ["Gluten-Free", "High Protein"],
        ingredients: [
          { label: "Almond flour",         shopQuery: "almond flour pancake mix" },
          { label: "Sugar-free maple syrup", shopQuery: "sugar free maple syrup" },
          { label: "Eggs",                 shopQuery: "organic eggs" },
          { label: "Unsweetened almond milk", shopQuery: "unsweetened almond milk" },
        ],
        tip: "Add a scoop of unflavored protein powder for an extra 20g protein.",
      },
      {
        name: "Greek Yogurt Parfait",
        description: "Plain Greek yogurt layered with chia seeds, walnuts, and low-sugar granola. High fiber, satisfying all morning.",
        time: "5 min", kcal: "~320 kcal", gi: "Low GI",
        tags: ["High Protein", "Probiotic"],
        ingredients: [
          { label: "Plain Greek yogurt (0%)",  shopQuery: "plain greek yogurt no sugar" },
          { label: "Chia seeds",               shopQuery: "chia seeds" },
          { label: "Low-sugar granola",        shopQuery: "low carb granola keto" },
          { label: "Walnuts",                  shopQuery: "raw walnuts" },
        ],
      },
      {
        name: "Egg & Veggie Scramble",
        description: "Scrambled eggs with spinach, bell peppers and avocado. Zero carb base, loaded with healthy fat and protein.",
        time: "10 min", kcal: "~350 kcal", gi: "Low GI",
        tags: ["Keto", "Gluten-Free"],
        ingredients: [
          { label: "Eggs",           shopQuery: "organic eggs" },
          { label: "Baby spinach",   shopQuery: "baby spinach" },
          { label: "Avocado",        shopQuery: "avocado" },
          { label: "Feta cheese",    shopQuery: "feta cheese" },
        ],
        tip: "Use MCT oil or coconut oil for cooking to boost ketones.",
      },
    ],
  },
  Lunch: {
    icon: PiBowlFoodBold,
    color: "text-teal-500",
    bg:    "bg-teal-500/10 border-teal-500/20",
    items: [
      {
        name: "Cauliflower Rice Bowl",
        description: "Riced cauliflower as a base with grilled chicken, avocado, cucumber, and a tahini dressing. Feels like a real grain bowl.",
        time: "20 min", kcal: "~420 kcal", gi: "Low GI",
        tags: ["Gluten-Free", "Keto", "Halal"],
        ingredients: [
          { label: "Cauliflower rice",     shopQuery: "frozen cauliflower rice" },
          { label: "Grilled chicken",      shopQuery: "rotisserie chicken" },
          { label: "Tahini",               shopQuery: "tahini sesame paste" },
          { label: "Avocado",              shopQuery: "avocado" },
        ],
      },
      {
        name: "Low-Carb Lettuce Wrap Tacos",
        description: "Seasoned ground turkey in butter lettuce cups with salsa, shredded cheese and lime. Under 10g net carbs.",
        time: "15 min", kcal: "~380 kcal", gi: "Low GI",
        tags: ["Gluten-Free", "High Protein"],
        ingredients: [
          { label: "Butter lettuce",        shopQuery: "butter lettuce" },
          { label: "Ground turkey",         shopQuery: "ground turkey" },
          { label: "Salsa (no sugar added)", shopQuery: "sugar free salsa" },
          { label: "Shredded cheese",       shopQuery: "shredded cheese" },
        ],
        tip: "Use Siete almond flour tortillas if you want something sturdier.",
      },
      {
        name: "Lentil & Veggie Soup",
        description: "Hearty red lentil soup with turmeric, spinach and lemon. Lentils have a surprisingly low GI thanks to their fiber content.",
        time: "30 min", kcal: "~310 kcal", gi: "Medium GI",
        tags: ["Vegan", "Kosher", "Halal", "High Fiber"],
        ingredients: [
          { label: "Red lentils",           shopQuery: "red lentils" },
          { label: "Vegetable broth",       shopQuery: "low sodium vegetable broth" },
          { label: "Turmeric",              shopQuery: "turmeric powder" },
          { label: "Baby spinach",          shopQuery: "baby spinach" },
        ],
      },
    ],
  },
  Dinner: {
    icon: PiMoonBold,
    color: "text-violet-500",
    bg:    "bg-violet-500/10 border-violet-500/20",
    items: [
      {
        name: "Baked Salmon with Asparagus",
        description: "Omega-3 rich salmon fillet with roasted asparagus and a lemon-garlic butter sauce. No starchy sides needed.",
        time: "25 min", kcal: "~480 kcal", gi: "Low GI",
        tags: ["Keto", "Gluten-Free", "High Protein"],
        ingredients: [
          { label: "Salmon fillet",         shopQuery: "wild salmon fillet" },
          { label: "Asparagus",             shopQuery: "fresh asparagus" },
          { label: "Garlic",                shopQuery: "garlic" },
          { label: "Olive oil",             shopQuery: "extra virgin olive oil" },
        ],
        tip: "Omega-3s in salmon help improve insulin sensitivity.",
      },
      {
        name: "Cauliflower Pizza",
        description: "Crispy cauliflower crust pizza with low-sugar marinara, mozzarella and your choice of toppings. Satisfies the craving.",
        time: "40 min", kcal: "~360 kcal", gi: "Low GI",
        tags: ["Gluten-Free", "Keto"],
        ingredients: [
          { label: "Cauliflower pizza crust",  shopQuery: "cauliflower pizza crust" },
          { label: "No-sugar marinara",        shopQuery: "no sugar added marinara sauce" },
          { label: "Mozzarella",               shopQuery: "fresh mozzarella" },
          { label: "Turkey pepperoni",         shopQuery: "turkey pepperoni" },
        ],
      },
      {
        name: "Zucchini Noodles & Turkey Bolognese",
        description: "Zoodles replace pasta entirely — same satisfying texture, nearly zero carbs. Turkey keeps it lean.",
        time: "30 min", kcal: "~390 kcal", gi: "Low GI",
        tags: ["Gluten-Free", "High Protein"],
        ingredients: [
          { label: "Zucchini noodles",     shopQuery: "zucchini noodles spiralizer" },
          { label: "Ground turkey",        shopQuery: "ground turkey" },
          { label: "Tomato sauce (no sugar)", shopQuery: "no sugar tomato sauce" },
          { label: "Parmesan",             shopQuery: "parmesan cheese" },
        ],
      },
    ],
  },
  Snacks: {
    icon: PiCookieBold,
    color: "text-rose-500",
    bg:    "bg-rose-500/10 border-rose-500/20",
    items: [
      {
        name: "Almond Butter + Celery",
        description: "Classic combo — the crunch and fat from almond butter stabilizes blood sugar between meals. Under 3g net carbs.",
        time: "2 min", kcal: "~180 kcal", gi: "Low GI",
        tags: ["Vegan", "Gluten-Free", "Keto"],
        ingredients: [
          { label: "Celery stalks",       shopQuery: "celery" },
          { label: "Almond butter (no sugar)", shopQuery: "no sugar almond butter" },
        ],
      },
      {
        name: "Cheese & Turkey Roll-Ups",
        description: "Deli turkey slices wrapped around cheddar or provolone. Zero carbs, high protein, portable anywhere.",
        time: "3 min", kcal: "~160 kcal", gi: "Low GI",
        tags: ["Keto", "Gluten-Free", "High Protein"],
        ingredients: [
          { label: "Sliced turkey",         shopQuery: "deli turkey slices no nitrates" },
          { label: "Cheese slices",         shopQuery: "provolone slices" },
          { label: "Mustard (no sugar)",    shopQuery: "sugar free mustard" },
        ],
      },
      {
        name: "Spindrift Sparkling Water + Nuts",
        description: "Spindrift uses real fruit juice with very low sugar. Pair with a handful of mixed nuts for a satisfying snack.",
        time: "1 min", kcal: "~200 kcal", gi: "Low GI",
        tags: ["Vegan", "Gluten-Free"],
        ingredients: [
          { label: "Spindrift sparkling water", shopQuery: "spindrift sparkling water" },
          { label: "Mixed nuts",                shopQuery: "mixed nuts no salt" },
        ],
        tip: "Spindrift Lemon or Grapefruit have only 1-2g of natural sugar per can.",
      },
    ],
  },
};

const mealKeys = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;

export default function MealsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Meal Inspiration</h1>
        <p className="text-muted-foreground max-w-2xl">
          Diabetic-friendly meal ideas for every part of the day — each one low-GI, balanced, and built around
          ingredients you can find in our shop.
        </p>
      </div>

      {mealKeys.map((mealTime) => {
        const { icon: Icon, color, bg, items } = meals[mealTime];
        return (
          <section key={mealTime} className="mb-14">
            {/* Section header */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold mb-6 ${bg} ${color}`}>
              <Icon className="h-4 w-4" />
              {mealTime}
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {items.map((meal) => (
                <div
                  key={meal.name}
                  className="rounded-xl border border-border/50 bg-card p-5 flex flex-col gap-3 hover:border-teal-500/40 hover:shadow-md transition-all"
                >
                  {/* Title + meta */}
                  <div>
                    <h3 className="font-bold text-base mb-1">{meal.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{meal.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <PiClockBold className="h-3.5 w-3.5 text-teal-500" /> {meal.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <PiFireBold className="h-3.5 w-3.5 text-teal-500" /> {meal.kcal}
                    </span>
                    <span className={`font-medium ${meal.gi === "Low GI" ? "text-emerald-600" : "text-amber-600"}`}>
                      {meal.gi}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {meal.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Ingredients with shop links */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Key Ingredients</p>
                    <ul className="space-y-1">
                      {meal.ingredients.map((ing) => (
                        <li key={ing.label} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1.5">
                            <PiLeafBold className="h-3 w-3 text-teal-500 shrink-0" />
                            {ing.label}
                          </span>
                          <Link
                            href={`/shop?q=${encodeURIComponent(ing.shopQuery)}`}
                            className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline font-medium flex items-center gap-0.5"
                          >
                            Find <PiArrowRightBold className="h-2.5 w-2.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tip */}
                  {meal.tip && (
                    <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 border border-border/30 italic">
                      💡 {meal.tip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-500/10 to-transparent border border-teal-500/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg mb-1">Find everything in our shop</h3>
          <p className="text-muted-foreground text-sm">Browse lower-sugar products with dietary filters.</p>
        </div>
        <Link href="/shop">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white gap-2 shrink-0">
            Browse Shop <PiArrowRightBold className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
