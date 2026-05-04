import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/Authcontext";
import { useAuth } from "./context/Authcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";

export default function App() {
  const  loading  = useAuth();
  const [page, setPage] = useState("home");
  const [viewProduct, setViewProduct] = useState(null);

  const handleViewProduct = (product) => {
    setViewProduct(product);
    setPage("product");
  };

  const handleBack = () => {
    setViewProduct(null);
    setPage("shop");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="font-display text-2xl font-semibold tracking-tight mb-2">Soundmart</p>
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white font-sans">
          <Header />
          <Navbar setPage={setPage} />

          {page === "home" && (
            <HomePage setPage={setPage} setViewProduct={handleViewProduct} />
          )}
          {page === "shop" && (
            <ShopPage setViewProduct={handleViewProduct} />
          )}
          {page === "product" && viewProduct && (
            <ProductPage product={viewProduct} onBack={handleBack} />
          )}
          {page === "login" && <LoginPage setPage={setPage} />}
          {page === "register" && <RegisterPage setPage={setPage} />}

          <CartDrawer />

          <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}