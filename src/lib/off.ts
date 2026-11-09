/**
 * Open Food Facts — Search-a-licious endpoint
 * Free, no API key, no quota. English/US products only.
 */
import { Product, Category, DietaryTag, Nutrition } from "@/types";
import { CATEGORY_FALLBACK } from "@/lib/constants";

const BASE   = "https://search.openfoodfacts.org/search";
const FIELDS = [
  "code", "product_name", "product_name_en",
  "brands", "image_front_url", "nutriments",
  "labels_tags", "ingredients_text",
].join(",");

// Brand-specific queries targeting well-known US diabetic-friendly products
const QUERIES: Record<string, string[]> = {
  "bread-bakery": [
    "Sola sweet oat keto bread",
    "Dave's Killer Bread powerseed",
    "Base Culture keto bread",
    "Ezekiel sprouted grain bread",
    "Mission carb balance tortilla",
    "Siete almond flour tortillas",
    "Cali'flour pizza crust",
  ],
  "sweets-desserts": [
    "Lily's dark chocolate stevia",
    "Lily's milk chocolate bar",
    "ChocZero peanut butter cups",
    "Russell Stover sugar free pecan",
    "Hershey's zero sugar chocolate",
    "SmartSweets gummy bears",
  ],
  "ice-cream": [
    "Rebel ice cream keto",
    "Halo Top ice cream",
    "Enlightened keto ice cream",
    "Breyers carb smart ice cream",
    "Yasso greek frozen yogurt bar",
    "Arctic Zero ice cream",
  ],
  "drinks-beverages": [
    "Zevia cola stevia",
    "Zevia ginger ale",
    "Spindrift sparkling water",
    "LaCroix sparkling water",
    "Sparkling Ice black raspberry",
    "Bai antioxidant infusion",
    "Roar organic electrolyte infusion",
  ],
  snacks: [
    "Quest protein chips",
    "Quest tortilla style chips",
    "PopCorners popped corn chips",
    "Whisps cheese crisps",
    "Moon Cheese crunchy cheese",
    "SkinnyPop popcorn",
    "Lesser Evil popcorn",
  ],
  "meals-kits": [
    "Miracle Noodle shirataki",
    "Palmini hearts of palm linguine",
    "Birds Eye steamfresh cauliflower rice",
    "Green Giant riced veggies",
    "Nasoya pasta zero shirataki",
  ],
  medications: [
    "Glucerna nutrition shake",
    "Boost glucose control drink",
    "Premier Protein shake",
    "Ensure max protein shake",
    "Fairlife core power protein shake",
  ],
};

export const CATEGORIES = Object.keys(QUERIES);

const DEFAULT_QUERIES = [
  "Lily's chocolate sugar free stevia",
  "Quest protein snack low carb keto",
  "Rebel Creamery ice cream keto",
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface OFFProduct {
  code?:             string;
  product_name?:     string;
  product_name_en?:  string;
  brands?:           string | string[];
  image_front_url?:  string;
  nutriments?:       Record<string, number | string>;
  labels_tags?:      string[];
  ingredients_text?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getN(n: Record<string, number | string> | undefined, key: string): number | undefined {
  if (!n) return undefined;
  const v = n[key];
  if (typeof v === "number" && v > 0) return Math.round(v * 10) / 10;
  return undefined;
}

function getBrand(brands: OFFProduct["brands"]): string {
  if (!brands) return "";
  if (Array.isArray(brands)) return brands[0]?.trim() ?? "";
  return brands.split(",")[0].trim();
}

// Only certification labels on the package count; ingredient text like "kosher salt" must not create a badge.
const LABEL_TAGS: Record<DietaryTag, RegExp> = {
  halal:         /^en:halal/,
  kosher:        /^en:kosher|^en:orthodox-union-kosher|^en:ok-kosher/,
  vegan:         /^en:vegan/,
  "gluten-free": /^en:(no-gluten|gluten-free)/,
  organic:       /^en:(organic|usda-organic|eu-organic)/,
};

function inferDietaryTags(labels: string[] | undefined): DietaryTag[] {
  return (Object.keys(LABEL_TAGS) as DietaryTag[]).filter((tag) =>
    (labels ?? []).some((l) => LABEL_TAGS[tag].test(l)),
  );
}

function estimateGI(n: Nutrition): { score: number; level: "low" | "medium" | "high" } | null {
  if (n.carbs === undefined || n.sugar === undefined) return null;
  const net = Math.max(0, n.carbs - (n.fiber ?? 0));
  const sr  = n.carbs > 0 ? n.sugar / n.carbs : 0;
  let score = net < 5 ? Math.round(10 + net * 2)
    : sr < 0.2        ? Math.round(20 + net * 0.6)
    :                    Math.round(30 + net * 0.8 + n.sugar * 1.2);
  score = Math.min(100, Math.max(1, score));
  return { score, level: score < 55 ? "low" : score < 70 ? "medium" : "high" };
}

function mapProduct(p: OFFProduct, category: Category): Product | null {
  const name = (p.product_name_en || p.product_name || "").trim();
  if (!name || name.length < 3) return null;

  // Skip non-ASCII or clearly non-English product names
  if (/[^\x00-\x7F]/.test(name)) return null;
  // Common non-English words that appear in food product names (FR/DE/IT/CS/NL)
  if (/\b(de|du|la|le|les|et|au|sans|avec|poudre|farine|graines|craquelins|mehl|ohne|und|oder|kacha|kaše|lada|duo|sucre|palomit\w*|palmito|jodsalz|barre|chocolat\b(?!e\b))\b/i.test(name)) return null;

  const nutrition: Nutrition = {
    calories: getN(p.nutriments, "energy-kcal_100g"),
    carbs:    getN(p.nutriments, "carbohydrates_100g"),
    sugar:    getN(p.nutriments, "sugars_100g"),
    fiber:    getN(p.nutriments, "fiber_100g"),
    protein:  getN(p.nutriments, "proteins_100g"),
    fat:      getN(p.nutriments, "fat_100g"),
    sodium:   getN(p.nutriments, "sodium_100g"),
  };

  if (!getBrand(p.brands)) return null;

  const gi    = estimateGI(nutrition);
  // Require a real product photo — skip products without one
  if (!p.image_front_url) return null;
  const image = p.image_front_url;

  // Hard-exclude clearly wrong categories (bread in ice cream, etc.)
  const nameLower = name.toLowerCase();
  const HARD_EXCLUDE: Partial<Record<Category, RegExp>> = {
    "ice-cream":       /\bbread\b|\btortilla\b|\bbun\b|\broll\b|\bbagel\b|\bcoffee\b|\bjuice\b|\bsoda\b|\bprotein.bar\b/,
    "bread-bakery":    /\bice.?cream\b|\bsoda\b|\bchip\b|\bcandy\b|\bshake\b/,
    "drinks-beverages":/\bbread\b|\bice.?cream\b|\bchip\b|\bcandy\b/,
    snacks:            /\bbread\b|\bice.?cream\b|\bsoda\b/,
  };
  const excluded = HARD_EXCLUDE[category];
  if (excluded && excluded.test(nameLower)) return null;

  // Diabetic relevance: drop high-sugar products in food categories
  const sugarPer100 = typeof p.nutriments?.["sugars_100g"] === "number"
    ? p.nutriments["sugars_100g"] as number
    : null;
  const SUGAR_LIMITS: Partial<Record<Category, number>> = {
    "ice-cream":       15,
    "sweets-desserts": 30,
    "drinks-beverages": 2,
    snacks:            10,
    "bread-bakery":    10,
  };
  const sugarLimit = SUGAR_LIMITS[category];
  if (sugarLimit !== undefined && sugarPer100 !== null && sugarPer100 > sugarLimit) return null;
  const desc  = [
    nutrition.calories !== undefined ? `${nutrition.calories} kcal` : null,
    nutrition.sugar    !== undefined ? `${nutrition.sugar}g sugar`  : null,
    nutrition.carbs    !== undefined ? `${nutrition.carbs}g carbs`  : null,
  ].filter(Boolean).join(" · ") || "Diabetic-friendly product";

  return {
    id:          `off-${p.code ?? Math.random().toString(36).slice(2)}`,
    name:        name.length > 80 ? name.slice(0, 77) + "…" : name,
    brand:       getBrand(p.brands) || "Unknown Brand",
    category,
    description: desc,
    price:       0,
    image,
    giScore:     gi?.score,
    giLevel:     gi?.level,
    nutrition,
    dietaryTags: inferDietaryTags(p.labels_tags),
    affiliateUrl: `https://www.amazon.com/s?k=${encodeURIComponent(name)}`,
    retailer:    "Amazon",
    inStock:     true,
    rating:      0,
    reviewCount: 0,
    isFeatured:  false,
    isBestSeller: false,
  };
}

// OFF search is loose (e.g. "Halo Top ice cream" returns burger buns), so keep only
// hits that match the brand (first query word) plus at least one more meaningful word.
const GENERIC = new Set(["low", "free", "sugar", "zero", "calorie", "keto", "organic", "the", "and", "with", "style"]);

function norm(w: string) {
  return w.toLowerCase().replace(/['’]s$/, "").replace(/[^a-z0-9]/g, "").replace(/s$/, "");
}

function matchesQuery(p: OFFProduct, query: string): boolean {
  const brands = Array.isArray(p.brands) ? p.brands.join(" ") : p.brands ?? "";
  const hay = new Set(`${p.product_name_en ?? ""} ${p.product_name ?? ""} ${brands}`.split(/[\s,]+/).map(norm));
  const words = query.split(/\s+/).map(norm).filter((w) => w.length > 2 && !GENERIC.has(w));
  const hits = words.filter((w) => hay.has(w)).length;
  return hay.has(words[0]) && hits >= Math.min(2, words.length);
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function singleFetch(query: string, category: Category, pageSize = 15): Promise<Product[]> {
  const params = new URLSearchParams({
    q:          query,
    fields:     FIELDS,
    page_size:  String(pageSize),
    page:       "1",
    filter_by:  "countries_tags:en:united-states",
  });

  try {
    const ctrl = new AbortController();
    const t    = setTimeout(() => ctrl.abort(), 10_000);
    const res  = await fetch(`${BASE}?${params}`, {
      signal: ctrl.signal,
      next:   { revalidate: 3600 },
    });
    clearTimeout(t);
    if (!res.ok) { console.error(`OFF ${res.status}: ${query}`); return []; }

    const data = await res.json() as { hits?: OFFProduct[] };
    return (data.hits ?? [])
      .filter((p) => matchesQuery(p, query))
      .map((p) => mapProduct(p, category))
      .filter((p): p is Product => p !== null)
      .slice(0, 3);
  } catch (e) {
    console.error("OFF fetch error:", e);
    return [];
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

async function _fetchProducts(opts: {
  category?: string;
  diet?:     string;
  search?:   string;
}): Promise<Product[]> {
  const { category, diet, search } = opts;
  const cat     = category as Category | undefined;
  const queries = search
    ? [search]
    : cat
    ? (QUERIES[cat] ?? DEFAULT_QUERIES)
    : DEFAULT_QUERIES;

  const perQuery = 50;
  const batches  = await Promise.all(
    queries.map((q) => singleFetch(q, cat ?? "snacks", perQuery))
  );

  // Deduplicate by product ID, image filename, and normalized name
  const seenIds   = new Set<string>();
  const seenImgs  = new Set<string>();
  const seenNames = new Set<string>();
  const merged: Product[] = [];

  for (const batch of batches) {
    for (const p of batch) {
      const imgKey  = p.image.includes("openfoodfacts.org")
        ? p.image.split("/").slice(-1)[0]
        : "";
      // Normalize name: lowercase, strip punctuation, trim to first 5 words
      const nameKey = p.name.toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .split(" ").slice(0, 5).join(" ");

      if (seenIds.has(p.id) || (imgKey && seenImgs.has(imgKey)) || seenNames.has(nameKey)) continue;
      seenIds.add(p.id);
      if (imgKey) seenImgs.add(imgKey);
      seenNames.add(nameKey);
      if (diet && !p.dietaryTags.includes(diet as DietaryTag)) continue;
      merged.push(p);
    }
  }

  return merged.slice(0, 40);
}

export function fetchProducts(opts: { category?: string; diet?: string; search?: string }) {
  return _fetchProducts(opts);
}

let catalogPromise: Promise<Record<string, Product[]>> | null = null;

// Sequential per category to stay gentle on the free OFF API; memoized so the build fetches once per worker.
export function fetchCatalog(): Promise<Record<string, Product[]>> {
  catalogPromise ??= (async () => {
    const catalog: Record<string, Product[]> = {};
    for (const cat of CATEGORIES) catalog[cat] = await fetchProducts({ category: cat });
    return catalog;
  })();
  return catalogPromise;
}
