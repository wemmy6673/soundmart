import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/Authcontext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function StatCard({ label, value, icon, color, to }) {
  return (
    <Link to={to} className={`bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow block`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </span>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-300">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
      <p className="text-2xl font-display font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </Link>
  );
}

export default function AdminDashboard() {
  const { getToken } = useAuth();
  const [stats, setStats] = useState({ products: 0, users: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${getToken()}` };

        const [productsRes, usersRes] = await Promise.all([
          fetch(`${API_URL}/products?limit=100`, { headers }),
          fetch(`${API_URL}/admin/users`, { headers }),
        ]);

        const products = productsRes.ok ? await productsRes.json() : [];
        const users = usersRes.ok ? await usersRes.json() : [];

        setStats({
          products: products.length,
          users: users.length,
          orders: 0,
          revenue: 0,
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Products",
      value: loading ? "—" : stats.products,
      to: "/admin/products",
      color: "bg-blue-50 text-blue-600",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        </svg>
      ),
    },
    {
      label: "Total Users",
      value: loading ? "—" : stats.users,
      to: "/admin/users",
      color: "bg-purple-50 text-purple-600",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      ),
    },
    {
      label: "Total Orders",
      value: loading ? "—" : stats.orders,
      to: "/admin/orders",
      color: "bg-amber-50 text-amber-600",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
        </svg>
      ),
    },
    {
      label: "Total Revenue",
      value: loading ? "—" : `$${stats.revenue.toLocaleString()}`,
      to: "/admin/orders",
      color: "bg-green-50 text-green-600",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-gray-900">Overview</h2>
        <p className="text-sm text-gray-400 mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "Add Product", to: "/admin/products/new", color: "bg-black text-white hover:bg-gray-800" },
            { label: "View Orders", to: "/admin/orders", color: "bg-gray-50 text-gray-700 hover:bg-gray-100" },
            { label: "Manage Users", to: "/admin/users", color: "bg-gray-50 text-gray-700 hover:bg-gray-100" },
          ].map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className={`${action.color} px-4 py-3 rounded-xl text-sm font-medium text-center transition-colors`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}