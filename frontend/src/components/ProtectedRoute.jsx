import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

/**
 * ProtectedRoute
 *
 * Wraps routes that require authentication or a specific role.
 *
 * Usage:
 *   <ProtectedRoute>             → requires any logged-in user
 *   <ProtectedRoute role="admin"> → requires admin role
 */
export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  // Wait for session restore before deciding
  if (loading) return null;

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Logged in but wrong role → redirect to home
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
}