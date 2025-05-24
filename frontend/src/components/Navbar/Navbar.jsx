import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !e.target.closest(".mobile-menu") &&
        !e.target.closest("#menu-button")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const baseMenuItems = ["Home", "Books", "About", "Contact"];
  const authMenuItems = isLoggedIn ? ["Cart", "Profile"] : [];

  return (
    <>
      <nav className="bg-gray-900 shadow-xl px-4 sm:px-6 lg:px-8 fixed w-full z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="flex items-center group">
                <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">
                  📚
                </span>
                <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover:from-pink-500 hover:to-purple-500 transition-all duration-500">
                  DarkChapter
                </span>
              </a>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8">
              {[...baseMenuItems, ...authMenuItems].map((item) => (
                <a
                  key={item}
                  href={`/${item === "Home" ? "" : item}`}
                  className={`relative px-3 py-2 text-sm font-medium group transition-all duration-300 ${
                    item === "Profile"
                      ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-4 py-1 shadow-md hover:shadow-lg"
                      : "text-gray-300 group-hover:text-white"
                  }`}
                >
                  {/* Add role-based text for Profile */}
                  {item === "Profile"
                    ? role === "admin"
                      ? "Admin Profile"
                      : "Profile"
                    : item}
                  {item !== "Profile" && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  )}
                </a>
              ))}
            </div>

            {/* Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn && (
                <>
                  <a href="/login">
                    <button className="relative overflow-hidden bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5">
                      Login
                      <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 hover:opacity-10"></span>
                    </button>
                  </a>
                  <a href="/signup">
                    <button className="relative overflow-hidden border border-purple-500 text-purple-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-purple-900/50 hover:shadow-lg hover:shadow-purple-500/20">
                      SignUp
                      <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 hover:opacity-10"></span>
                    </button>
                  </a>
                </>
              )}
            </div>

            {/* Hamburger Icon - Mobile */}
            <button
              id="menu-button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-gray-900 px-4 pb-4 pt-2 space-y-1 mobile-menu">
              {[...baseMenuItems, ...authMenuItems].map((item) => (
                <a
                  key={item}
                  href={`/${item === "Home" ? "" : item}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    item === "Profile"
                      ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 text-center shadow-md"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {/* Add role-based text for Profile */}
                  {item === "Profile"
                    ? role === "admin"
                      ? "Admin Profile"
                      : "Profile"
                    : item}
                </a>
              ))}
              {!isLoggedIn && (
                <>
                  <a
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block bg-purple-600 hover:bg-purple-700 text-white text-center px-4 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block border border-purple-500 text-purple-300 hover:bg-purple-900/50 hover:text-white text-center px-4 py-2 rounded-md text-base font-medium"
                  >
                    SignUp
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Add padding to avoid navbar overlap */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;
