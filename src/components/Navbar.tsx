import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-orange-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            Sev & Namkeen
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="hover:text-orange-300 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-orange-300 transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="hover:text-orange-300 transition-colors duration-200 flex items-center"
            >
              Cart
              <span className="ml-1 bg-orange-300 text-orange-900 rounded-full px-2 text-xs font-semibold">
                0
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              aria-label="Toggle menu"
              className="focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-orange-700 px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md hover:bg-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block px-3 py-2 rounded-md hover:bg-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="block px-3 py-2 rounded-md hover:bg-orange-500 flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            Cart
            <span className="ml-2 bg-orange-300 text-orange-900 rounded-full px-2 text-xs font-semibold">
              0
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
}
