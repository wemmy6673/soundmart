import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cart, removeFromCart, total, cartOpen, setCartOpen } = useCart();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="slide-in relative w-full max-w-sm bg-white h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-display text-xl font-semibold">
            Your Cart ({cart.length})
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-gray-50 rounded-full"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-5xl block mb-4">🎧</span>
              <p className="text-gray-400 text-sm">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="bg-gray-50 rounded-xl w-14 h-14 flex items-center justify-center text-2xl flex-shrink-0">
                  {item.img}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.category}</p>
                  <p className="text-sm font-semibold mt-1">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(idx)}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100">
            <div className="flex justify-between mb-4">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold font-display text-lg">${total}</span>
            </div>
            <button className="bg-black text-white w-full py-4 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
              Checkout →
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              Free shipping on this order
            </p>
          </div>
        )}
      </div>
    </div>
  );
}