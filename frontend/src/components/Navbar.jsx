import { useCart } from "../context/CartContext";
import { useAuth } from "../context/Authcontext";
import { BsCartFill } from "react-icons/bs";
import SearchInput from "./SearchInput";
import { BsPerson } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import { toast } from "react-toastify";




export default function Navbar({ setPage }) {
  const { cart, setCartOpen } = useCart();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("You've been logged out.");
    setPage("home");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="w-full mx-auto md:px-44 py-6 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => setPage("home")}
          className="font-display text-3xl flex flex-row items-center text-green-900 font-semibold tracking-tight"
        >
         <span className="pr-1"><BsCartFill /></span> SoundMart
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Categories", "Deals", "What’s New", "Delivery"].map((link) => (
            <button
              key={link}
              onClick={() => link === "Categories" && setPage("categories")}
              className="nav-link text-lg font-medium text-gray-700 hover:text-black transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
        <div className="max-w-md w-full">  
        <SearchInput className="mx-4 md:mx-0"
            placeholder="Search headphones..."
            onSearch={(val) => console.log("Searching for:", val)}
            onClear={() => console.log("Search cleared")}
          />
          </div>

        {/* Right Icons */}
        <div className="flex flex-row gap-10">
          

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div
              onClick={() => setPage("login")}
              className="text-lg font-medium items-center cursor-pointer text-gray-700 hover:text-black transition-colors hidden md:flex md:flex-row"
            >
              <div className=""><BsPerson className="inline-block text-2xl mr-1" /></div>
              <h1>Account</h1>
            </div>
          )}

          {/* Cart */}
          <div
            onClick={() => setCartOpen(true)}
            className="relative flex flex-row gap-1 p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
              <div><BsCart3 className="text-2xl text-gray-700" /></div> <h1 className="text-lg font-medium text-gray-700">Cart</h1>
            {cart.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}