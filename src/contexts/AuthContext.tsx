'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { apiService, User, LoginCredentials, SignupData, ProfileUpdateData } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: ProfileUpdateData) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await apiService.verifyToken();
      if (response.valid) {
        const userProfile = await apiService.getProfile();
        setUser(userProfile);
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('auth_token');
      }
    } catch {
      // Token is invalid or expired
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    clearError();
    
    try {
      const authResponse = await apiService.login(credentials);
      localStorage.setItem('auth_token', authResponse.access_token);
      const userProfile = await apiService.getProfile();
      setUser(userProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setLoading(true);
    clearError();
    
    try {
      await apiService.signup(userData);
      // After successful signup, log the user in
      await login({ email: userData.email, password: userData.password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      
      // Call logout API to invalidate token
      await apiService.logout();
    } catch (error) {
      // Even if API call fails, we should still logout locally
      console.error('Logout API error:', error);
    } finally {
      // Clear local state regardless of API response
      localStorage.removeItem('auth_token');
      setUser(null);
      router.push('/login-signup');
    }
  };

  const updateProfile = async (profileData: ProfileUpdateData) => {
    try {
      setError(null);
      setLoading(true);
      
      const updatedUser = await apiService.updateProfile(profileData);
      setUser(updatedUser);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Profile update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfileImage = async (file: File) => {
    try {
      setError(null);
      setLoading(true);
      
      await apiService.uploadProfileImage(file);
      
      // After successful image upload, update the user profile with the new image URL
      const updatedUser = await apiService.getProfile();
      setUser(updatedUser);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Profile image upload failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    uploadProfileImage,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 