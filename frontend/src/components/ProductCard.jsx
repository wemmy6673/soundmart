import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const badgeColors = {
  Bestseller: "bg-amber-100 text-amber-800",
  New: "bg-blue-100 text-blue-800",
  Sale: "bg-red-100 text-red-700",
  Premium: "bg-gray-900 text-white",
};

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="product-card group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image */}
      <div
        className="overflow-hidden rounded-2xl mb-4 relative bg-gray-50 border border-gray-100"
        style={{ aspectRatio: "1" }}
      >
        {product.badge && (
          <span className={`absolute top-3 left-3 z-10 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[product.badge] || "bg-gray-100 text-gray-700"}`}>
            {product.badge}
          </span>
        )}
        {product.tag && (
          <span className="absolute top-3 right-3 z-10 text-xs font-medium bg-white border border-gray-200 px-2 py-0.5 rounded-full">
            {product.tag}
          </span>
        )}

        <div className="product-img w-full h-full">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            // No image — show headphone emoji so it's clearly a product, not a skeleton
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
              <span style={{ fontSize: "64px", lineHeight: 1 }}>🎧</span>
              <span className="text-xs text-gray-300 mt-2">No image</span>
            </div>
          )}
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
        {product.description && (
          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center gap-2 mt-3">
          <span className="font-semibold text-gray-900">${Number(product.price).toFixed(2)}</span>
          {product.original_price && (
            <span className="text-sm text-gray-400 line-through">
              ${Number(product.original_price).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}