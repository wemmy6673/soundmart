import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";

// ─────────────────────────────────────────────────────────────────────────────

export default function LoginPage({ setPage }) {
  const { login, loginWithToken, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  // Navigate once user state is confirmed set after login
  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);
 
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(form.email, form.password);
    if (result.success) {
      toast.success("Welcome back! You're now signed in.");
      // Navigation is handled by the useEffect above once user state updates
    } else {
      setError(result.error);
      toast.error(result.error);
    }
    setLoading(false);
  };

  const handleGoogleSuccess = (data) => {
    toast.success("Welcome back! You're now signed in.");
    loginWithToken(data.access_token, data.user);
    // Navigation handled by useEffect above
  };
  const handleGoogleError = (msg) => {
    toast.error(msg);
    setError(msg);
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
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
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