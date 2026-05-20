import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/UseProducts";

const categories = ["All", "Over-Ear", "On-Ear", "In-Ear"];

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-100 rounded-2xl mb-4" style={{ aspectRatio: "1" }} />
      <div className="h-3 bg-gray-100 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
    </div>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [search, setSearch] = useState("");

  const { products, loading, error } = useProducts({
    category: activeCategory === "All" ? undefined : activeCategory,
    search: search || undefined,
  });

  const sorted = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-8">
        <h2 className="font-display text-4xl font-semibold mb-2">All Headphones</h2>
        <p className="text-gray-400">
          {loading ? "Loading..." : `${sorted.length} product${sorted.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                activeCategory === c
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="text-gray-400">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400 w-32"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded-full px-4 py-1.5 bg-white text-gray-700 outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => <ProductSkeleton key={i} />)}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-20">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && sorted.length === 0 && (
        <div className="text-center py-24 border border-dashed border-gray-200 rounded-2xl">
          <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-4 text-gray-300">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          </svg>
          <p className="text-gray-400 font-medium mb-1">No products found</p>
          <p className="text-gray-300 text-sm">
            {search ? `No results for "${search}". Try a different search.` : "No products available in this category yet."}
          </p>
        </div>
      )}

      {/* Products grid */}
      {!loading && !error && sorted.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}