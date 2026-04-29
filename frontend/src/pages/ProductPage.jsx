import { useState } from "react";
import StarRating from "../components/StarRating";
import { useCart } from "../context/CartContext";

export default function ProductPage({ product, onBack }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 fade-in">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 mb-8 hover:text-black transition-colors"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Shop
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="bg-gray-50 rounded-3xl aspect-square flex items-center justify-center">
          <span style={{ fontSize: "150px", lineHeight: 1 }}>{product.img}</span>
        </div>

        {/* Details */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">
            {product.category}
          </p>
          <h1 className="font-display text-5xl font-semibold mb-3">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating} />
            <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
          </div>
          <p className="text-gray-500 leading-relaxed mb-6">
            {product.description} Premium build quality with attention to every
            acoustic detail.
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-8">
            <span className="font-display text-4xl font-semibold">
              ${product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
                <span className="text-sm font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  Save ${product.originalPrice - product.price}
                </span>
              </>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
              >
                −
              </button>
              <span className="px-4 text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className={`flex-1 py-4 rounded-full text-sm font-semibold transition-all ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
            <button className="px-6 py-4 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
            {[
              ["🚚", "Free Shipping", "On orders over $50"],
              ["🔄", "30-Day Returns", "Hassle-free policy"],
              ["🛡️", "2yr Warranty", "Full coverage"],
            ].map(([icon, title, sub]) => (
              <div key={title} className="text-center">
                <span className="text-xl block mb-1">{icon}</span>
                <p className="text-xs font-semibold text-gray-800">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}