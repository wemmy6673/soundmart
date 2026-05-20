import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";
import { useCart } from "../context/CartContext";
import { useProduct } from "../hooks/UseProducts";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { product, loading, error } = useProduct(id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
        <div className="h-4 bg-gray-100 rounded w-24 mb-8" />
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-100 rounded-3xl aspect-square" />
          <div className="space-y-4">
            <div className="h-3 bg-gray-100 rounded w-1/4" />
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
            <div className="h-10 bg-gray-100 rounded w-1/3 mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="text-gray-400 text-lg mb-6">Product not found.</p>
        <button
          onClick={() => navigate("/shop")}
          className="text-sm font-medium underline underline-offset-4 text-gray-600 hover:text-black"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 fade-in">
      {/* Back */}
      <button
        onClick={() => navigate("/shop")}
        className="flex items-center gap-2 text-sm text-gray-500 mb-8 hover:text-black transition-colors"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Shop
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="bg-gray-50 rounded-3xl aspect-square flex items-center justify-center overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover rounded-3xl"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-300">
              <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="text-sm mt-3">No image available</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">
            {product.category}
          </p>
          <h1 className="font-display text-5xl font-semibold mb-4">{product.name}</h1>

          {product.tag && (
            <span className="inline-block text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full mb-4">
              {product.tag}
            </span>
          )}

          <p className="text-gray-500 leading-relaxed mb-6">{product.description}</p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-8">
            <span className="font-display text-4xl font-semibold">${product.price}</span>
            {product.original_price && (
              <>
                <span className="text-xl text-gray-400 line-through">${product.original_price}</span>
                <span className="text-sm font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  Save ${(product.original_price - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <p className={`text-sm mb-6 font-medium ${product.stock <= 5 ? "text-red-500" : "text-green-600"}`}>
            {product.stock === 0 ? "Out of stock" : product.stock <= 5 ? `Only ${product.stock} left!` : "In stock"}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
              >−</button>
              <span className="px-4 text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="px-4 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
              >+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`flex-1 py-4 rounded-full text-sm font-semibold transition-all ${
                added
                  ? "bg-green-600 text-white"
                  : product.stock === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {added ? "✓ Added to Cart!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <button className="px-6 py-4 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
          </div>

          {/* Trust badges */}
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