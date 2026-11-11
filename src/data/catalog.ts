import { Category, CategoryId, Product } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "bakery", label: "Bakery",        emoji: "🍞", tint: "#FBE7C6" },
  { id: "sweets", label: "Sweets",        emoji: "🍫", tint: "#F9DCE3" },
  { id: "frozen", label: "Frozen Treats", emoji: "🍦", tint: "#DCEBF7" },
  { id: "drinks", label: "Drinks",        emoji: "🥤", tint: "#D9F0E3" },
  { id: "snacks", label: "Snacks",        emoji: "🍿", tint: "#FDEBD0" },
  { id: "pantry", label: "Pantry",        emoji: "🫙", tint: "#ECE5F7" },
  { id: "meals",  label: "Meals & Kits",  emoji: "🥗", tint: "#E3F1D8" },
];

export const categoryById = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!;

type Row = [
  id: string, name: string, category: CategoryId, price: number, size: string, emoji: string,
  description: string, serving: string,
  nutrition: [calories: number, carbs: number, fiber: number, sugar: number, protein: number],
  diet: Product["diet"], keywords: string, badge?: Product["badge"],
];

// Demo catalog: illustrative products and prices for showing partners the store experience.
const ROWS: Row[] = [
  ["seeded-keto-loaf", "Seeded Keto Sandwich Loaf", "bakery", 8.99, "16 oz loaf", "🍞",
    "Soft, toastable sandwich bread packed with seeds and fiber. Just 2g net carbs a slice.",
    "1 slice", [90, 9, 7, 0, 6], ["kosher", "halal"], "keto bread sandwich low carb toast", "Bestseller"],
  ["almond-flour-tortillas", "Almond Flour Tortillas", "bakery", 7.49, "8 count", "🫓",
    "Grain-free tortillas that fold without cracking. Great for tacos and wraps.",
    "1 tortilla", [90, 8, 3, 1, 3], ["gluten-free", "vegan", "kosher"], "wrap tortilla grain free almond tacos", "Bestseller"],
  ["sprouted-grain-bagels", "Sprouted Grain Bagels", "bakery", 6.99, "4 count", "🥯",
    "Chewy bagels made from sprouted whole grains for a slower, steadier energy release.",
    "1 bagel", [150, 24, 6, 1, 9], ["vegan", "kosher", "halal"], "bagel breakfast sprouted whole grain"],
  ["cauliflower-pizza-crust", "Cauliflower Pizza Crust", "bakery", 8.49, "2 crusts", "🍕",
    "Crispy-edged pizza crust made mostly from cauliflower. Top it and bake in 10 minutes.",
    "1/3 crust", [80, 6, 2, 1, 6], ["gluten-free", "halal"], "pizza crust cauliflower dinner"],
  ["almond-pancake-mix", "Almond Flour Pancake Mix", "bakery", 9.99, "12 oz", "🥞",
    "Fluffy pancakes and waffles with a fraction of the carbs. Just add eggs and milk.",
    "1/3 cup mix", [160, 10, 4, 2, 6], ["gluten-free", "kosher"], "pancake waffle almond flour breakfast mix"],

  ["dark-chocolate-stevia", "72% Dark Chocolate with Stevia", "sweets", 4.99, "3 oz bar", "🍫",
    "Rich, smooth dark chocolate sweetened with stevia. No sugar added.",
    "1/3 bar", [120, 13, 8, 1, 3], ["vegan", "kosher", "gluten-free"], "chocolate dark bar sugar free stevia", "Bestseller"],
  ["peanut-butter-cups", "Sugar-Free Peanut Butter Cups", "sweets", 5.99, "6 cups", "🥜",
    "Creamy peanut butter in a milk chocolate shell, sweetened without sugar.",
    "1 cup", [90, 9, 6, 0, 3], ["kosher", "gluten-free"], "peanut butter cups chocolate candy sugar free"],
  ["keto-chocolate-chip-cookies", "Keto Chocolate Chip Cookies", "sweets", 7.99, "6 cookies", "🍪",
    "Soft-baked, golden cookies with real chocolate chips and almond flour.",
    "1 cookie", [110, 8, 5, 1, 3], ["gluten-free", "halal"], "cookies chocolate chip keto dessert"],
  ["sugar-free-gummies", "Sugar-Free Fruit Gummies", "sweets", 3.99, "5 oz bag", "🍬",
    "Chewy fruit gummies with all the fun and 1g of sugar per serving.",
    "1/2 bag", [100, 25, 15, 1, 0], ["halal", "kosher"], "gummies gummy bears candy sugar free fruit", "New"],

  ["vanilla-keto-ice-cream", "Vanilla Bean Keto Ice Cream", "frozen", 6.99, "1 pint", "🍦",
    "Creamy, scoopable vanilla bean ice cream with no added sugar.",
    "1/2 cup", [120, 9, 4, 1, 3], ["gluten-free", "kosher"], "ice cream vanilla keto dessert frozen", "Bestseller"],
  ["chocolate-fudge-bars", "Chocolate Fudge Ice Cream Bars", "frozen", 7.49, "4 bars", "🍨",
    "Fudgy chocolate ice cream bars dipped in a crackly chocolate coating.",
    "1 bar", [100, 10, 5, 2, 3], ["gluten-free", "kosher"], "ice cream bars chocolate fudge frozen dessert"],
  ["strawberry-yogurt-bars", "Strawberry Greek Yogurt Bars", "frozen", 5.99, "4 bars", "🍓",
    "Tangy Greek frozen yogurt swirled with real strawberries. 6g of protein each.",
    "1 bar", [80, 10, 1, 6, 6], ["halal", "kosher", "gluten-free"], "frozen yogurt greek strawberry bars"],
  ["mango-sorbet", "Mango Sorbet, No Sugar Added", "frozen", 5.49, "1 pint", "🥭",
    "Bright, dairy-free mango sorbet sweetened only by the fruit itself.",
    "1/2 cup", [60, 14, 3, 8, 0], ["vegan", "gluten-free", "kosher", "halal"], "sorbet mango dairy free frozen fruit", "New"],

  ["lemon-sparkling-water", "Lemon Sparkling Water", "drinks", 5.99, "8 × 12 fl oz", "🍋",
    "Crisp sparkling water with a squeeze of real lemon. Nothing else added.",
    "1 can", [0, 0, 0, 0, 0], ["vegan", "kosher", "halal", "gluten-free", "organic"], "sparkling water seltzer lemon zero"],
  ["zero-sugar-cola", "Zero-Sugar Cola", "drinks", 6.49, "6 × 12 fl oz", "🥤",
    "Classic cola flavor sweetened with stevia. Zero sugar, zero calories.",
    "1 can", [0, 0, 0, 0, 0], ["vegan", "kosher", "halal", "gluten-free"], "soda cola zero sugar stevia"],
  ["unsweetened-cold-brew", "Unsweetened Cold Brew", "drinks", 4.49, "32 fl oz", "☕",
    "Smooth, slow-steeped cold brew coffee. Pour over ice and go.",
    "8 fl oz", [5, 0, 0, 0, 0], ["vegan", "kosher", "halal", "gluten-free", "organic"], "coffee cold brew unsweetened"],
  ["coconut-electrolyte-water", "Coconut Electrolyte Water", "drinks", 2.99, "16.9 fl oz", "🥥",
    "Hydrating coconut water with added electrolytes and no added sugar.",
    "1 bottle", [25, 6, 0, 4, 0], ["vegan", "kosher", "halal", "gluten-free", "organic"], "coconut water electrolyte hydration"],
  ["chocolate-protein-shake", "Chocolate Protein Shake", "drinks", 11.99, "4 × 11 fl oz", "🥛",
    "Ready-to-drink chocolate shake with 30g of protein and 1g of sugar.",
    "1 bottle", [160, 6, 3, 1, 30], ["gluten-free", "kosher", "halal"], "protein shake chocolate nutrition drink", "Bestseller"],
  ["vanilla-nutrition-shake", "Vanilla Balanced Nutrition Shake", "drinks", 9.99, "6 × 8 fl oz", "🧋",
    "A balanced meal-replacement shake made to be gentle on blood sugar.",
    "1 bottle", [180, 16, 4, 4, 16], ["gluten-free", "kosher", "halal"], "nutrition shake vanilla meal replacement diabetic"],

  ["parmesan-crisps", "Baked Parmesan Cheese Crisps", "snacks", 4.99, "2.1 oz", "🧀",
    "100% baked parmesan, crunchy as a chip. Zero carbs.",
    "1 bag", [150, 1, 0, 0, 13], ["gluten-free"], "cheese crisps parmesan keto chips", "Bestseller"],
  ["nacho-protein-chips", "Nacho Cheese Protein Chips", "snacks", 2.49, "1.1 oz bag", "🌮",
    "Bold nacho flavor with 19g of protein and just 4g net carbs.",
    "1 bag", [140, 5, 1, 1, 19], ["gluten-free", "halal"], "chips protein nacho cheese tortilla", "Bestseller"],
  ["lightly-salted-popcorn", "Lightly Salted Popcorn", "snacks", 3.99, "4.4 oz", "🍿",
    "Air-popped whole-grain popcorn with a light touch of sea salt.",
    "3 cups", [120, 15, 3, 0, 2], ["vegan", "gluten-free", "kosher", "halal", "organic"], "popcorn whole grain snack"],
  ["unsalted-mixed-nuts", "Roasted Mixed Nuts, Unsalted", "snacks", 8.99, "16 oz", "🌰",
    "Almonds, cashews, pecans and walnuts, slow-roasted with nothing added.",
    "1/4 cup", [170, 6, 3, 1, 6], ["vegan", "gluten-free", "kosher", "halal"], "mixed nuts almonds walnuts unsalted"],
  ["zero-sugar-beef-jerky", "Zero-Sugar Beef Jerky", "snacks", 7.99, "2.5 oz", "🥩",
    "Tender, smoky beef jerky with 13g of protein and no sugar.",
    "1 oz", [70, 1, 0, 0, 13], ["gluten-free", "halal"], "jerky beef meat protein snack"],
  ["roasted-chickpeas", "Crunchy Roasted Chickpeas", "snacks", 3.49, "5 oz", "🫘",
    "Crunchy, sea-salted chickpeas with plant protein and 6g of fiber.",
    "1 oz", [120, 16, 6, 2, 6], ["vegan", "gluten-free", "kosher", "halal"], "chickpeas roasted crunchy plant protein"],

  ["sugar-free-maple-syrup", "Sugar-Free Maple Syrup", "pantry", 6.49, "12 fl oz", "🍁",
    "Rich maple flavor for pancakes and oatmeal, with zero sugar.",
    "1/4 cup", [10, 4, 0, 0, 0], ["vegan", "kosher", "halal", "gluten-free"], "maple syrup sugar free pancake breakfast"],
  ["no-sugar-marinara", "No-Sugar-Added Marinara", "pantry", 6.99, "24 oz jar", "🍅",
    "Slow-simmered tomato sauce with olive oil, garlic and basil. No sugar added.",
    "1/2 cup", [60, 6, 2, 4, 1], ["vegan", "gluten-free", "kosher", "halal", "organic"], "marinara tomato sauce pasta no sugar"],
  ["almond-butter", "Creamy Almond Butter", "pantry", 9.49, "12 oz jar", "🥄",
    "Just roasted almonds and a pinch of salt. No sugar, no palm oil.",
    "2 tbsp", [190, 6, 3, 1, 7], ["vegan", "gluten-free", "kosher", "halal"], "almond butter nut spread no sugar"],
  ["stone-ground-tahini", "Stone-Ground Tahini", "pantry", 8.49, "16 oz jar", "🫙",
    "Silky sesame tahini for dressings, dips and bowls.",
    "2 tbsp", [180, 6, 3, 0, 5], ["vegan", "gluten-free", "kosher", "halal"], "tahini sesame paste dressing"],
  ["red-lentils", "Organic Red Lentils", "pantry", 3.99, "2 lb bag", "🍲",
    "Quick-cooking lentils full of fiber and plant protein. Ready in 15 minutes.",
    "1/4 cup dry", [170, 30, 8, 1, 12], ["vegan", "gluten-free", "kosher", "halal", "organic"], "lentils red soup dal plant protein"],
  ["monk-fruit-sweetener", "Monk Fruit Sweetener", "pantry", 8.99, "16 oz", "🍯",
    "Measures cup-for-cup like sugar for baking, coffee and tea.",
    "1 tsp", [0, 4, 0, 0, 0], ["vegan", "gluten-free", "kosher", "halal"], "sweetener monk fruit sugar substitute baking"],
  ["low-carb-granola", "Low-Carb Nut Granola", "pantry", 9.99, "11 oz", "🥣",
    "Toasty clusters of nuts and seeds. Perfect on Greek yogurt.",
    "1/3 cup", [180, 9, 5, 1, 6], ["gluten-free", "kosher"], "granola cereal breakfast nuts low carb"],

  ["cauliflower-rice", "Frozen Cauliflower Rice", "meals", 3.49, "12 oz", "🥦",
    "Riced cauliflower, ready in 5 minutes. Swap it in anywhere you'd use rice.",
    "1 cup", [25, 5, 2, 2, 2], ["vegan", "gluten-free", "kosher", "halal", "organic"], "cauliflower rice frozen vegetables", "Bestseller"],
  ["shirataki-fettuccine", "Shirataki Fettuccine", "meals", 3.99, "8 oz", "🍝",
    "Konjac noodles with almost no carbs. Rinse, heat and add your sauce.",
    "1/2 pack", [10, 3, 3, 0, 0], ["vegan", "gluten-free", "kosher", "halal"], "pasta noodles shirataki konjac fettuccine"],
  ["hearts-of-palm-linguine", "Hearts of Palm Linguine", "meals", 4.99, "12 oz", "🌴",
    "Tender pasta-style strands made from hearts of palm.",
    "1/2 cup", [20, 4, 2, 0, 1], ["vegan", "gluten-free", "kosher", "halal"], "pasta linguine hearts of palm noodles"],
  ["chicken-veggie-kit", "Lemon Herb Chicken & Veggie Kit", "meals", 12.99, "Serves 2", "🍗",
    "Everything for a 20-minute dinner: seasoned chicken, roasted veggies and herb sauce.",
    "1 serving", [380, 14, 5, 4, 34], ["gluten-free", "halal"], "meal kit dinner chicken lemon herb", "New"],
  ["lentil-bowl-kit", "Mediterranean Lentil Bowl Kit", "meals", 11.49, "Serves 2", "🥙",
    "Lentils, crisp veggies, olives and a lemony tahini dressing.",
    "1 serving", [420, 38, 12, 5, 18], ["vegan", "kosher", "halal"], "meal kit lunch lentil bowl mediterranean"],
];

export const PRODUCTS: Product[] = ROWS.map(
  ([id, name, category, price, size, emoji, description, serving, [calories, carbs, fiber, sugar, protein], diet, keywords, badge]) => ({
    id, name, category, price, size, emoji, description, serving,
    nutrition: { calories, carbs, fiber, sugar, protein },
    diet,
    keywords: keywords.split(" "),
    badge,
  }),
);

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);

export const netCarbs = (p: Product) => Math.max(0, p.nutrition.carbs - p.nutrition.fiber);

export const DIET_LABELS: Record<Product["diet"][number], string> = {
  halal: "Halal",
  kosher: "Kosher",
  vegan: "Vegan",
  "gluten-free": "Gluten-free",
  organic: "Organic",
};

export const FREE_SHIPPING_MIN = 35;
export const SHIPPING_FEE = 5.99;

export const money = (n: number) => `$${n.toFixed(2)}`;
