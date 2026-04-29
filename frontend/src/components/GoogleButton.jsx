/**
 * GoogleButton.jsx
 *
 * Uses @react-oauth/google under the hood.
 * Install with: npm install @react-oauth/google
 *
 * Wrap your App in <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
 * in main.jsx — see bottom of this file for instructions.
 *
 * On success, sends the Google credential (JWT) to your FastAPI backend:
 *   POST /auth/google  { token: "<google_jwt>" }
 * FastAPI verifies the token with Google, creates/finds the user in DB,
 * and returns your own app JWT.
 */

import { useGoogleLogin } from "@react-oauth/google";

export default function GoogleButton({ onSuccess, onError, label = "Continue with Google" }) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Exchange Google access token for your app's JWT via FastAPI
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });

        if (!res.ok) {
          const err = await res.json();
          onError?.(err.detail || "Google authentication failed.");
          return;
        }

        const data = await res.json();
        // data = { access_token, token_type, user: { id, name, email, role } }
        onSuccess?.(data);
      } catch {
        onError?.("Network error. Please try again.");
      }
    },
    onError: () => onError?.("Google sign-in was cancelled or failed."),
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      {/* Google SVG logo */}
      <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.84l6.1-6.1C34.46 3.09 29.53 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.1 5.52C12.4 13.67 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.22-.42-4.74H24v9h12.7c-.55 2.94-2.2 5.44-4.67 7.12l7.18 5.58C43.35 37.13 46.5 31.27 46.5 24.5z"/>
        <path fill="#FBBC05" d="M10.74 28.26A14.63 14.63 0 019.5 24c0-1.48.26-2.9.72-4.24l-7.1-5.52A23.93 23.93 0 001 24c0 3.87.93 7.53 2.56 10.77l7.18-6.51z"/>
        <path fill="#34A853" d="M24 47c5.53 0 10.17-1.83 13.55-4.96l-7.18-5.58c-1.83 1.23-4.18 1.95-6.37 1.95-6.26 0-11.6-4.17-13.26-9.76l-7.18 6.51C7.07 41.52 14.82 47 24 47z"/>
        <path fill="none" d="M1 1h46v46H1z"/>
      </svg>
      {label}
    </button>
  );
}

/**
 * ─── SETUP INSTRUCTIONS ────────────────────────────────────────────────
 *
 * 1. Install the package:
 *      npm install @react-oauth/google
 *
 * 2. Get your Google Client ID:
 *      - Go to https://console.cloud.google.com/
 *      - Create a project → APIs & Services → Credentials
 *      - Create OAuth 2.0 Client ID (Web application)
 *      - Add http://localhost:5173 to Authorized JavaScript origins
 *      - Add http://localhost:8000/auth/google/callback to Authorized redirect URIs
 *
 * 3. Add to your .env file:
 *      VITE_API_URL=http://localhost:8000
 *      VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
 *
 * 4. Wrap your app in main.jsx:
 *      import { GoogleOAuthProvider } from "@react-oauth/google";
 *
 *      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
 *        <App />
 *      </GoogleOAuthProvider>
 *
 * 5. FastAPI backend route (routers/auth.py):
 *      @router.post("/auth/google")
 *      async def google_auth(token: GoogleToken, db: Session = Depends(get_db)):
 *          # Verify token with Google
 *          user_info = await verify_google_token(token.token)
 *          # Find or create user in DB
 *          user = get_or_create_user(db, email=user_info["email"], name=user_info["name"])
 *          # Return your own JWT
 *          access_token = create_access_token(data={"sub": str(user.id)})
 *          return { "access_token": access_token, "token_type": "bearer", "user": user }
 * ────────────────────────────────────────────────────────────────────────
 */