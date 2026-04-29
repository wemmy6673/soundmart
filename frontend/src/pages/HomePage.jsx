import ProductCard from "../components/ProductCard";
import products from "../data/product";
import lala from "../images/lala.png";

export default function HomePage({ setPage, setViewProduct }) {
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
              <img src={lala} alt="" />

            </div>
          </div>
 
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-4 mb-2">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-4xl font-semibold">
              Featured Products
            </h2>
            <p className="text-gray-400 mt-1 text-sm">
              Our most-loved headphones this season
            </p>
          </div>
          <button
            onClick={() => setPage("shop")}
            className="text-sm font-medium underline underline-offset-4 text-gray-600 hover:text-black"
          >
            View all
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} onView={setViewProduct} />
          ))}
        </div>
      </section>

      {/* Limited Edition Banner */}
      <section className="bg-gray-950 text-white py-20 px-6 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-medium mb-4">
            Limited Edition
          </p>
          <h2 className="font-display text-5xl font-semibold mb-6">
            Studio Pro XL
          </h2>
          <p className="text-gray-400 mb-8">
            Planar magnetic drivers. Studio-grade reference sound. Only 200
            units available.
          </p>
          <button className="bg-white text-black px-10 py-4 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
            Shop Limited Edition
          </button>
        </div>
      </section>
    </>
  );
}