import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";


function AppContent() {
  const loading = useAuth();
  const location = useLocation();
  const AUTH_ROUTES = ["/login", "/register"];
  const isAuthPage = AUTH_ROUTES.includes(location.pathname);
 
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-white">
  //       <div className="text-center">
  //         <p className="font-display text-2xl font-semibold tracking-tight mb-2">SONUS</p>
  //         <p className="text-sm text-gray-400">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }
 
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/shop"        element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/register"    element={<RegisterPage />} />
 
        {/* Admin routes — add pages here as you build them */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="font-display text-4xl font-semibold">Admin Dashboard</h1>
                <p className="text-gray-400 mt-2">Coming soon.</p>
              </div>
            </ProtectedRoute>
          }
        />
 
        {/* Catch-all → redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAuthPage && <CartDrawer />}

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
  );
}
export default function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}