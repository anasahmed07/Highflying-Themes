'use client'
import { MenuIcon, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#060606]/95 backdrop-blur-sm shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl sm:text-2xl font-light text-white hover:text-emerald-400 transition-colors duration-200"
            onClick={closeMobileMenu}
          >
            Highflying Themes
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium" 
              href="/themes"
            >
              Themes
            </Link>
            <Link 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium" 
              href="/upload-theme"
            >
              Upload Theme
            </Link>
            <Link 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium" 
              href="/about-us"
            >
              About Us
            </Link>
            <Link 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium" 
              href="/contact-us"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Login/Signup */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login-signup?tab=login"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Sign In
            </Link>
            <Link 
              href="/login-signup?tab=signup"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-[#0A0A0A]">
            <nav className="px-4 py-4 space-y-4">
              <Link 
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2" 
                href="/themes"
                onClick={closeMobileMenu}
              >
                Themes
              </Link>
              <Link 
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2" 
                href="/upload-theme"
                onClick={closeMobileMenu}
              >
                Upload Theme
              </Link>
              <Link 
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2" 
                href="/about-us"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
              <Link 
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2" 
                href="/contact-us"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              
              {/* Mobile Login/Signup */}
              <div className="pt-4 border-t border-gray-700 space-y-3">
                <Link 
                  href="/login-signup?tab=login"
                  className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
                <Link 
                  href="/login-signup?tab=signup"
                  className="block w-full text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;