'use client'
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

function LoginSignupContent() {
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, loading, error, clearError } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  // Handle URL parameters for tab switching
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      setIsLogin(false);
    } else if (tab === 'login') {
      setIsLogin(true);
    }
  }, [searchParams]);

  // Only clear error when user manually changes tabs, not on mount
  const handleTabChange = (newTab: boolean) => {
    setIsLogin(newTab);
    clearError();
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('tab', newTab ? 'login' : 'signup');
    window.history.replaceState({}, '', url.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    // Get the redirect URL from search params
    const redirectUrl = searchParams.get('redirect');

    if (isLogin) {
      // Login
      try {
        await login({
          email: formData.email,
          password: formData.password,
        });
        
        // Redirect to the original URL if it exists and is safe, otherwise to profile
        if (redirectUrl) {
          // Validate the redirect URL to ensure it's safe
          try {
            const redirectUrlObj = new URL(redirectUrl, window.location.origin);
            // Only allow redirects to our own domain
            if (redirectUrlObj.origin === window.location.origin) {
              window.location.href = redirectUrl;
            } else {
              window.location.href = '/profile';
            }
          } catch {
            // If the URL is invalid, redirect to profile
            window.location.href = '/profile';
          }
        } else {
          window.location.href = '/profile';
        }
      } catch {
        // Error is handled by the context
      }
    } else {
      // Signup
      if (formData.password !== formData.confirmPassword) {
        // Handle password mismatch error
        return;
      }

      try {
        await signup({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });
        
        // For signup, redirect to profile by default since the user is new
        // They will be redirected to profile by default
        window.location.href = '/profile';
      } catch {
        // Error is handled by the context
      }
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg p-8">
          <div className="flex mb-8 bg-[#0A0A0A] rounded-lg p-1">
            <button
              onClick={() => handleTabChange(true)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isLogin
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleTabChange(false)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isLogin
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-red-400 text-sm">{error}</p>
                <button
                  onClick={clearError}
                  className="text-red-400 hover:text-red-300 transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter your username"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Confirm your password"
                />
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-1 text-red-400 text-sm">Passwords do not match</p>
                )}
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 bg-[#0A0A0A] border-gray-600 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-sm text-emerald-400 hover:text-emerald-300">
                  Forgot password?
                </button>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agree"
                  required
                  className="mt-1 h-4 w-4 text-emerald-600 bg-[#0A0A0A] border-gray-600 rounded focus:ring-emerald-500"
                />
                <label htmlFor="agree" className="text-sm text-gray-300">
                  I agree to the{' '}
                  <button type="button" className="text-emerald-400 hover:text-emerald-300">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-emerald-400 hover:text-emerald-300">
                    Privacy Policy
                  </button>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 font-medium"
            >
              {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">Or continue with</p>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white hover:border-gray-500 transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white hover:border-gray-500 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => handleTabChange(!isLogin)}
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function LoginSignupLoading() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Loading...
          </p>
        </div>
        <div className="bg-[#1E1E1E] rounded-lg p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginSignupPage() {
  return (
    <Suspense fallback={<LoginSignupLoading />}>
      <LoginSignupContent />
    </Suspense>
  );
} 