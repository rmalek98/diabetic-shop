import { CATEGORIES, DIET_LABELS, PRODUCTS } from "@/data/catalog";
import { Product } from "@/types";

const STOPWORDS = new Set(["and", "the", "with", "for", "a", "of", "no", "free", "sugar", "low", "added"]);

const SYNONYMS: Record<string, string> = {
  gf: "gluten-free",
  glutenfree: "gluten-free",
  zabiha: "halal",
  plant: "vegan",
  pasta: "noodles",
  soda: "cola",
  candy: "gummies",
  icecream: "ice",
};

function haystack(p: Product): string {
  const category = CATEGORIES.find((c) => c.id === p.category)!.label;
  return [p.name, category, p.size, ...p.keywords, ...p.diet, ...p.diet.map((d) => DIET_LABELS[d])]
    .join(" ")
    .toLowerCase();
}

// Diet words like "halal" work as filters through search rather than as on-card labels.
export function searchProducts(query: string, products: Product[] = PRODUCTS, strict = false): Product[] {
  const q = query.toLowerCase().replace(/gluten[\s-]?free/g, "gluten-free").replace(/ice cream/g, "icecream");
  const words = q
    .split(/[\s,]+/)
    .map((w) => w.replace(/[^a-z0-9-]/g, ""))
    .map((w) => SYNONYMS[w] ?? w)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
  if (words.length === 0) return products;

  const dietWords = words.filter((w) => w in DIET_LABELS);
  const otherWords = words.filter((w) => !(w in DIET_LABELS));

  return products
    .filter((p) => dietWords.every((d) => p.diet.includes(d as Product["diet"][number])))
    .map((p) => {
      const hay = haystack(p);
      const hits = otherWords.filter((w) => hay.includes(w.replace(/s$/, ""))).length;
      return { p, hits };
    })
    .filter(({ hits }) => otherWords.length === 0 || hits >= (strict ? otherWords.length : Math.ceil(otherWords.length / 2)))
    .sort((a, b) => b.hits - a.hits)
    .map(({ p }) => p);
}

export const SUGGESTED_SEARCHES = ["keto bread", "chocolate", "ice cream", "pasta", "protein shake"];
export const DIET_SEARCHES = ["halal", "kosher", "vegan", "gluten-free"];
