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
            className="flex items-center group text-white"
            onClick={closeMobileMenu}
          >
            <svg 
              width="180" 
              height="60" 
              viewBox="0 0 637 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-auto transition-colors duration-200 group-hover:text-emerald-400"
            >
              <path fill-rule="evenodd" clip-rule="evenodd" d="M65 61L55.5 6L67 2.5L76 45.5L88.5 28.5L96 40L103.5 5L115 10.5L103.5 62H95L87.5 47.5L75 62L65 61Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M127.5 2.5L125.5 61H143L141 2.5H127.5Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M197.5 3H150.5V12L167.5 13.5L163.5 62.5H179.5V15.5L196.5 16.5L197.5 3Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M404 2H357V11L374 12.5L370 61.5H386V14.5L403 15.5L404 2Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M263.5 61L260.5 5L275.5 7L276 24L294 26L294.5 2.5L310 5L306 61H295.5L294 39.5L274.5 36.5L274 61H263.5Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M415 61.5L413 4.5L427 7.5L428.5 25.5L445.5 27.5L447 3L461.5 5.5L457.5 61.5H447L445.5 40L427 37L426.5 60.5L415 61.5Z" fill="currentColor"/>
              <path d="M593 61.5L591.5 3L631.5 2L626 14.5L606.5 13.5L604.5 25.5H629L628 34L604.5 36L606.5 50.5L634.5 46L635 58L593 61.5Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3 52L20.5 45V41L2 25.5L15 4.5H21.5L22 1H32V5H38L48 14.5L39 23.5L29.5 18V29.5L44.5 40L39.5 53L33 56V62H23.5V57L9 58.5L3 52ZM21.5 17L18.5 18L15.5 23L21 28L21.5 17ZM30 38.5L28.5 51.5L34.5 43.5L30 38.5Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M206.5 46L205.5 14L212.5 3L239 2.5L251.5 10L244 24.5L229 16L217.5 32L227.5 45H235.5L242.5 41.5L250.5 52.5L236 59L225 60L206.5 46Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M472 61.5L470.5 3L510.5 2L505 14.5L485.5 13.5L483.5 25.5H508L507 34L483.5 36L485.5 50.5L513.5 46L514 58L472 61.5Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M522.5 61.5L532 2H544.5L551 13.5L557 4.5L568.5 7L582 58L568.5 60.5V48L561.5 31L550.5 44L539 25.5L537 61.5H522.5Z" fill="currentColor"/>
            </svg>
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