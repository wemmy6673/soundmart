
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/UseProducts";


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

export default function HomePage({ }) {
    const { products, loading } = useProducts({ limit: 3 });

  return (
    <>
       {/* Hero */}
      <section style={{ backgroundColor: "#FAF6F1" }} className="py-20 mx-44">
        <div className="w-full px-24 mx-auto grid md:grid-cols-2 gap-12 items-center">
 
          {/* Left — text */}
          <div className="fade-in">
            
            <h1 className="font-display text-5xl md:text-6xl font-semibold leading-[1.1] mb-6 text-green-900">
              Grab up to{" "}
              <span className="text-amber-500">50% off</span>{" "}
              on selected headphones
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              Premium sound at unbeatable prices — for a limited time only.
              Don't miss out on our best deals of the season.
            </p>
            <button
              onClick={() => setPage("shop")}
              className="bg-green-900 text-white px-10 py-4 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Buy Now
            </button>
          </div>
 
          {/* Right — placeholder image */}
          <div className="flex items-center justify-center">
            <div
              className="w-full max-w-md rounded-3xl overflow-hidden flex items-center justify-center"
            >
              

            </div>
          </div>
 
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-44 py-4 mt-6 mb-2">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-4xl font-semibold">Featured Products</h2>
            <p className="text-gray-400 mt-1 text-sm">Our most-loved headphones this season</p>
          </div>
          {products.length > 0 && (
            <Link
              to="/shop"
              className="text-sm font-medium underline underline-offset-4 text-gray-600 hover:text-black"
            >
              View all
            </Link>
          )}
        </div>
 
        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => <ProductSkeleton key={i} />)}
          </div>
        )}
 
        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl">
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-4 text-gray-300">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            </svg>
            <p className="text-gray-400 font-medium">No products yet</p>
            <p className="text-gray-300 text-sm mt-1">Check back soon — new arrivals coming.</p>
          </div>
        )}
 
        {/* Products grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}