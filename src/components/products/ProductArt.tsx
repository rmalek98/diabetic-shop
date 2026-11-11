import { categoryById } from "@/data/catalog";
import { Product } from "@/types";

const SIZES = {
  sm: "text-3xl",
  md: "text-6xl",
  lg: "text-[7rem] sm:text-[9rem]",
};

export default function ProductArt({ product, size = "md", className = "" }: {
  product: Product;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const { tint } = categoryById(product.category);
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: tint }}
      role="img"
      aria-label={product.name}
    >
      <span
        aria-hidden
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/40"
      />
      <span
        aria-hidden
        className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-white/30"
      />
      <span aria-hidden className={`relative drop-shadow-sm select-none ${SIZES[size]}`}>
        {product.emoji}
      </span>
    </div>
  );
}
