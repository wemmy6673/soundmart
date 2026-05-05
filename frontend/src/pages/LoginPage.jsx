import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";
import { Link } from "react-router-dom";

// ─── Google Button (mock until backend is ready) ──────────────────────────────
function GoogleButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.84l6.1-6.1C34.46 3.09 29.53 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.1 5.52C12.4 13.67 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.22-.42-4.74H24v9h12.7c-.55 2.94-2.2 5.44-4.67 7.12l7.18 5.58C43.35 37.13 46.5 31.27 46.5 24.5z"/>
        <path fill="#FBBC05" d="M10.74 28.26A14.63 14.63 0 019.5 24c0-1.48.26-2.9.72-4.24l-7.1-5.52A23.93 23.93 0 001 24c0 3.87.93 7.53 2.56 10.77l7.18-6.51z"/>
        <path fill="#34A853" d="M24 47c5.53 0 10.17-1.83 13.55-4.96l-7.18-5.58c-1.83 1.23-4.18 1.95-6.37 1.95-6.26 0-11.6-4.17-13.26-9.76l-7.18 6.51C7.07 41.52 14.82 47 24 47z"/>
      </svg>
      {label}
    </button>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function LoginPage({ setPage }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(form.email, form.password);
    if (result.success) {
      toast.success("You're now signed in.");
      setPage("home");
    } else {
      setError(result.error);
      toast.error(result.error);
    }
    setLoading(false);
  };

  const handleGoogleClick = () => {
    toast.info("Google sign-in coming soon — backend not connected yet.");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md fade-in">
        {/* Brand */}
        <div className="text-center mb-10">
         
          <p className="text-black mt-2 text-2xl">Welcome back</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold mb-6">Sign In</h2>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-900 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button type="button" className="text-xs text-gray-400 hover:text-black transition-colors">
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-900 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Google OAuth */}
          <GoogleButton
            label="Continue with Google"
            onClick={handleGoogleClick}
          />
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register"
            className="font-medium text-black underline underline-offset-4"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}