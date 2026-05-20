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
import AccessDenied from "./pages/AccessDenied";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";


function AppContent() {
  const loading = useAuth();
  const location = useLocation();
  const AUTH_ROUTES = ["/login", "/register"];
  const ADMIN_ROUTES = ["/admin", "/admin/products", "/admin/orders", "/admin/users", "/admin/products/new"];

  const isAuthPage = AUTH_ROUTES.includes(location.pathname);
  const isAdminPage = location.pathname.startsWith("/admin");

 
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
      
      {!isAuthPage && <Header /> && <Navbar />}
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/shop"        element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/register"    element={<RegisterPage />} />
 
        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute role="admin"><AdminProducts /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute role="admin"><AdminOrders /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
        <Route path="/access-denied" element={<AccessDenied />} />

 
        {/* Catch-all → redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAuthPage && <CartDrawer /> && !isAdminPage}

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