'use client'
import { MenuIcon, X, User, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsUserDropdownOpen(false);
    closeMobileMenu();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="text-gray-400">Loading...</div>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium rounded-lg hover:bg-gray-800"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-emerald-600 flex items-center justify-center">
                    {user.profile_image ? (
                      <Image 
                        src={user.profile_image} 
                        alt={user.username}
                        className="w-full h-full object-cover"
                        width={32}
                        height={32}
                        onError={(e) => {
                          // Hide the image if it fails to load, showing the fallback
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}
                    {(!user.profile_image || user.profile_image === '') && (
                      <span className="text-white text-sm font-medium">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span>{user.username}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1E1E1E] border border-gray-700 rounded-lg shadow-lg py-2">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:text-red-400 hover:bg-gray-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
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
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-700 space-y-3">
                {loading ? (
                  <div className="text-gray-400 py-2">Loading...</div>
                ) : user ? (
                  <>
                    <Link 
                      href="/profile"
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2"
                      onClick={closeMobileMenu}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-emerald-600 flex items-center justify-center">
                        {user.profile_image ? (
                          <Image 
                            src={user.profile_image} 
                            alt={user.username}
                            className="w-full h-full object-cover"
                            width={32}
                            height={32}
                            onError={(e) => {
                              // Hide the image if it fails to load, showing the fallback
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : null}
                        {(!user.profile_image || user.profile_image === '') && (
                          <span className="text-white text-sm font-medium">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span>{user.username}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left text-gray-300 hover:text-red-400 transition-colors duration-200 font-medium py-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;