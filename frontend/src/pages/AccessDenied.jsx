import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function AccessDenied() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md fade-in">

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <svg
            width="36" height="36" fill="none" stroke="currentColor"
            strokeWidth="1.8" viewBox="0 0 24 24" className="text-red-500"
          >
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M12 8v4M12 16h.01" />
          </svg>
        </div>

        {/* Text */}
        <h1 className="font-display text-4xl font-semibold text-gray-900 mb-3">
          Access Denied
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-2">
          Sorry{user?.name ? `, ${user.name}` : ""}. You don't have permission to view this page.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          This area is restricted to administrators only. If you believe this is a mistake, please contact support.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Go to Home
          </Link>
          <Link
            to="/shop"
            className="border border-gray-200 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors text-gray-700"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}