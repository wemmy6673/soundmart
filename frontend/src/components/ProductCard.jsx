import { useState } from "react";
import StarRating from "./StarRating";
import { useCart } from "../context/CartContext";

const badgeColors = {
  Bestseller: "bg-amber-100 text-amber-800",
  New: "bg-blue-100 text-blue-800",
  Sale: "bg-red-100 text-red-700",
  Premium: "bg-gray-900 text-white",
};

export default function ProductCard({ product, onView }) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="product-card group cursor-pointer"
      onClick={() => onView(product)}
    >
      {/* Image */}
      <div
        className="overflow-hidden rounded-2xl bg-gray-50 mb-4 relative"
        style={{ aspectRatio: "1" }}
      >
        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 z-10 text-xs font-medium bg-white border border-gray-200 px-2 py-0.5 rounded-full">
          {product.tag}
        </span>

        <div className="product-img w-full h-full flex items-center justify-center">
          <span style={{ fontSize: "72px", lineHeight: 1 }}>{product.img}</span>
        </div>

        <button
          onClick={handleAdd}
          className={`absolute bottom-3 right-3 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
            added
              ? "bg-green-600 text-white"
              : "bg-black text-white opacity-0 group-hover:opacity-100"
          }`}
        >
          {added ? "✓ Added" : "+ Add"}
        </button>
      </div>

      {/* Info */}
      <div>
        <p className="text-xs text-gray-400 mb-1">{product.category}</p>
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{product.description}</p>
        <StarRating rating={product.rating} />
        <p className="text-xs text-gray-400 mt-0.5">{product.reviews} reviews</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="font-semibold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}