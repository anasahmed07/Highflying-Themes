'use client'
import { useState, useEffect } from 'react';
import { User, Settings, Upload, Heart, Download, Eye, Edit, Camera, Bell, X, Lock, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { apiService } from '@/lib/api';

function ProfileContent() {
  const { user, updateProfile, uploadProfileImage, logout, error: authError, clearError } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({
    username: '',
    bio: '',
    location: '',
    website: '',
    social_links: {
      twitter: '',
      github: '',
      discord: ''
    }
  });
  
  // Profile update state
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Delete account state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Set edit profile when user data is available
  useEffect(() => {
    if (user) {
      setEditProfile({
        username: user.username || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        social_links: {
          twitter: user.social_links?.twitter || '',
          github: user.social_links?.github || '',
          discord: user.social_links?.discord || ''
        }
      });
    }
  }, [user]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setProfileError('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setProfileError('Image file size must be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    setIsUploadingImage(true);
    setProfileError('');
    
    try {
      await uploadProfileImage(selectedImage);
      setProfileSuccess('Profile image updated successfully!');
      setSelectedImage(null);
      setImagePreview(null);
      setTimeout(() => {
        setProfileSuccess('');
      }, 3000);
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!editProfile.username.trim()) {
      setProfileError('Username cannot be empty');
      return;
    }

    if (editProfile.username.length < 3) {
      setProfileError('Username must be at least 3 characters long');
      return;
    }

    // Check if any fields were actually changed
    const hasChanges = 
      editProfile.username !== (user?.username || '') ||
      editProfile.bio !== (user?.bio || '') ||
      editProfile.location !== (user?.location || '') ||
      editProfile.website !== (user?.website || '') ||
      editProfile.social_links.twitter !== (user?.social_links?.twitter || '') ||
      editProfile.social_links.github !== (user?.social_links?.github || '') ||
      editProfile.social_links.discord !== (user?.social_links?.discord || '');

    if (!hasChanges) {
      setProfileError('No changes detected. Please modify at least one field before saving.');
      return;
    }

    setIsUpdatingProfile(true);
    setProfileError('');
    setProfileSuccess('');
    
    try {
      await updateProfile(editProfile);
      setProfileSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => {
        setProfileSuccess('');
      }, 3000);
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setEditProfile({
        username: user.username || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        social_links: {
          twitter: user.social_links?.twitter || '',
          github: user.social_links?.github || '',
          discord: user.social_links?.discord || ''
        }
      });
    }
    setIsEditing(false);
    setProfileError('');
    setProfileSuccess('');
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    setIsChangingPassword(true);
    try {
      await apiService.changePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordSuccess('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess('');
      }, 2000);
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : 'Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DEACTIVATE') {
      setDeleteError('Please type DEACTIVATE to confirm account deletion');
      return;
    }

    setIsDeletingAccount(true);
    setDeleteError('');
    
    try {
      await apiService.deleteAccount(false); // Soft delete (default behavior)
      await logout();
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Failed to delete account');
      setIsDeletingAccount(false);
    }
  };

  if (!user) {
    return null;
  }

  // Real user data - these would come from API endpoints in a full implementation
  const userStats = {
    themes: 0, // TODO: Implement themes API
    downloads: 0, // TODO: Implement downloads API
    likes: 0, // TODO: Implement likes API
    views: 0 // TODO: Implement views API
  };

  interface Theme {
    id: string;
    name: string;
    category: string;
    downloads: number;
    rating: number;
    updatedAt: string;
    author?: string;
  }

  const uploadedThemes: Theme[] = []; // TODO: Implement themes API
  const likedThemes: Theme[] = []; // TODO: Implement liked themes API

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'themes', label: 'My Themes', icon: Upload },
    { id: 'liked', label: 'Liked Themes', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Global Error Display */}
        {authError && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-red-400 text-sm">{authError}</p>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-[#1E1E1E] rounded-xl p-6 sm:p-8 mb-8 border border-gray-800/50">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-600 rounded-full flex items-center justify-center overflow-hidden">
                {user.profile_image ? (
                  <Image 
                    src={user.profile_image} 
                    alt={user.username}
                    className="w-full h-full object-cover"
                    width={96}
                    height={96}
                    onError={(e) => {
                      // Hide the image if it fails to load, showing the fallback
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                {(!user.profile_image || user.profile_image === '') && (
                  <span className="text-white text-xl sm:text-2xl font-medium">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <button 
                onClick={() => document.getElementById('profile-image-input')?.click()}
                className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
              </button>
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {/* Image Preview Modal */}
            {imagePreview && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-[#1E1E1E] rounded-lg p-6 w-full max-w-md mx-4">
                  <h3 className="text-xl font-light text-white mb-4">Preview Profile Image</h3>
                  <div className="mb-4">
                    <Image 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 rounded-full object-cover mx-auto"
                      width={128}
                      height={128}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleImageUpload}
                      disabled={isUploadingImage}
                      className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      {isUploadingImage ? 'Uploading...' : 'Upload Image'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                <h1 className="text-2xl sm:text-3xl font-light text-white">{user.username}</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors w-fit"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
              
              {/* Profile Error/Success Messages */}
              {profileError && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm">{profileError}</p>
                </div>
              )}
              
              {profileSuccess && (
                <div className="mb-4 p-3 bg-green-900/20 border border-green-500/50 rounded-lg">
                  <p className="text-green-400 text-sm">{profileSuccess}</p>
                </div>
              )}
              
              <p className="text-gray-400 mb-2 text-sm sm:text-base">@{user.username}</p>
              {user.bio ? (
                <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">{user.bio}</p>
              ) : (
                <p className="text-gray-500 mb-4 italic text-sm sm:text-base">No bio added yet</p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <span>📧 {user.email}</span>
                </div>
                {user.location ? (
                  <div className="flex items-center">
                    <span>📍 {user.location}</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>📍 No location set</span>
                  </div>
                )}
                <div className="flex items-center">
                  <span>📅 Joined {formatDate(user.created_at)}</span>
                </div>
              </div>

              {/* Website */}
              {user.website && (
                <div className="mt-4">
                  <a 
                    href={user.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm inline-flex items-center"
                  >
                    🌐 {user.website}
                  </a>
                </div>
              )}

              {/* Social Links */}
              {user.social_links && Object.keys(user.social_links).some(key => user.social_links![key]) && (
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  {user.social_links.twitter && (
                    <a 
                      href={user.social_links.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      🐦 Twitter
                    </a>
                  )}
                  {user.social_links.github && (
                    <a 
                      href={user.social_links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-300 transition-colors text-sm"
                    >
                      💻 GitHub
                    </a>
                  )}
                  {user.social_links.discord && (
                    <span className="text-gray-400 text-sm">
                      🎮 Discord: {user.social_links.discord}
                    </span>
                  )}
                </div>
              )}
              
              {/* Show message if no social links */}
              {(!user.social_links || Object.keys(user.social_links).every(key => !user.social_links![key])) && (
                <div className="mt-4">
                  <p className="text-gray-500 text-sm italic">No social links added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-[#1E1E1E] rounded-xl p-4 sm:p-6 text-center hover:bg-[#252525] transition-colors border border-gray-800/50">
            <div className="text-xl sm:text-2xl font-light text-white mb-1 sm:mb-2">{userStats.themes}</div>
            <div className="text-gray-400 text-xs sm:text-sm">Themes</div>
          </div>
          <div className="bg-[#1E1E1E] rounded-xl p-4 sm:p-6 text-center hover:bg-[#252525] transition-colors border border-gray-800/50">
            <div className="text-xl sm:text-2xl font-light text-white mb-1 sm:mb-2">{userStats.downloads.toLocaleString()}</div>
            <div className="text-gray-400 text-xs sm:text-sm">Downloads</div>
          </div>
          <div className="bg-[#1E1E1E] rounded-xl p-4 sm:p-6 text-center hover:bg-[#252525] transition-colors border border-gray-800/50">
            <div className="text-xl sm:text-2xl font-light text-white mb-1 sm:mb-2">{userStats.likes.toLocaleString()}</div>
            <div className="text-gray-400 text-xs sm:text-sm">Likes</div>
          </div>
          <div className="bg-[#1E1E1E] rounded-xl p-4 sm:p-6 text-center hover:bg-[#252525] transition-colors border border-gray-800/50">
            <div className="text-xl sm:text-2xl font-light text-white mb-1 sm:mb-2">{userStats.views.toLocaleString()}</div>
            <div className="text-gray-400 text-xs sm:text-sm">Views</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#1E1E1E] rounded-xl p-2 mb-8 border border-gray-800/50">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6 sm:space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Recent Uploaded Themes */}
              <div className="bg-[#1E1E1E] rounded-xl p-4 sm:p-6 border border-gray-800/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <h3 className="text-lg sm:text-xl font-light text-white">Recent Uploads</h3>
                  <Link
                    href="/upload-theme"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm w-fit"
                  >
                    Upload New Theme
                  </Link>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {uploadedThemes.slice(0, 3).map((theme) => (
                    <div key={theme.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                      <div className="flex-1 mb-3 sm:mb-0">
                        <h4 className="text-white font-medium text-sm sm:text-base">{theme.name}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm">{theme.category}</p>
                      </div>
                      <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{theme.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{theme.rating}</span>
                        </div>
                        <span className="hidden sm:inline">{theme.updatedAt}</span>
                      </div>
                    </div>
                  ))}
                  {uploadedThemes.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                      <p className="text-gray-400 mb-4 text-sm sm:text-base">No themes uploaded yet</p>
                      <Link
                        href="/upload-theme"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm"
                      >
                        Upload Your First Theme
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Liked Themes */}
              <div className="bg-[#1E1E1E] rounded-xl p-4 sm:p-6 border border-gray-800/50">
                <h3 className="text-lg sm:text-xl font-light text-white mb-6">Recent Likes</h3>
                <div className="space-y-3 sm:space-y-4">
                  {likedThemes.slice(0, 3).map((theme) => (
                    <div key={theme.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                      <div className="flex-1 mb-3 sm:mb-0">
                        <h4 className="text-white font-medium text-sm sm:text-base">{theme.name}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm">by {theme.author}</p>
                      </div>
                      <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{theme.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{theme.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {likedThemes.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                      <p className="text-gray-400 text-sm sm:text-base">No liked themes yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'themes' && (
            <div className="bg-[#1E1E1E] rounded-xl p-4 sm:p-6 border border-gray-800/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg sm:text-xl font-light text-white">My Themes</h3>
                <Link
                  href="/upload-theme"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm w-fit"
                >
                  Upload New Theme
                </Link>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {uploadedThemes.length > 0 ? (
                  uploadedThemes.map((theme) => (
                    <div key={theme.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                      <div className="flex-1 mb-3 sm:mb-0">
                        <h4 className="text-white font-medium text-sm sm:text-base">{theme.name}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm">{theme.category}</p>
                      </div>
                      <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{theme.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{theme.rating}</span>
                        </div>
                        <span className="hidden sm:inline">{theme.updatedAt}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 sm:py-16">
                    <div className="mb-4">
                      <Upload className="w-16 h-16 text-gray-500 mx-auto" />
                    </div>
                    <h3 className="text-white text-lg font-medium mb-2">No themes uploaded yet</h3>
                    <p className="text-gray-400 mb-6 text-sm sm:text-base">Start sharing your themes with the community</p>
                    <Link
                      href="/upload-theme"
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Upload Your First Theme
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'liked' && (
            <div className="bg-[#1E1E1E] rounded-xl p-4 sm:p-6 border border-gray-800/50">
              <h3 className="text-lg sm:text-xl font-light text-white mb-6">Liked Themes</h3>
              <div className="space-y-3 sm:space-y-4">
                {likedThemes.length > 0 ? (
                  likedThemes.map((theme) => (
                    <div key={theme.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                      <div className="flex-1 mb-3 sm:mb-0">
                        <h4 className="text-white font-medium text-sm sm:text-base">{theme.name}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm">by {theme.author}</p>
                      </div>
                      <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{theme.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{theme.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 sm:py-16">
                    <div className="mb-4">
                      <Heart className="w-16 h-16 text-gray-500 mx-auto" />
                    </div>
                    <h3 className="text-white text-lg font-medium mb-2">No liked themes yet</h3>
                    <p className="text-gray-400 mb-6 text-sm sm:text-base">Start exploring and liking themes from other creators</p>
                    <Link
                      href="/themes"
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Browse Themes
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Account Settings */}
              <div className="bg-[#1E1E1E] rounded-xl p-4 sm:p-6 border border-gray-800/50">
                <h3 className="text-lg sm:text-xl font-light text-white mb-6">Account Settings</h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white font-medium text-sm sm:text-base">Email Address</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white font-medium text-sm sm:text-base">Password</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">Change your password</p>
                    </div>
                    <button 
                      onClick={() => setShowPasswordModal(true)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors text-sm w-fit"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Change Password</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white font-medium text-sm sm:text-base">Profile Information</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">Edit your profile details</p>
                    </div>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors text-sm w-fit"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white font-medium text-sm sm:text-base">Two-Factor Authentication</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">Add an extra layer of security</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors text-sm w-fit">
                      Enable
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white font-medium text-sm sm:text-base">Deactivate Account</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">Deactivate your account.</p>
                    </div>
                    <button 
                      onClick={() => setShowDeleteModal(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm w-fit"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Deactivate Account</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-[#1E1E1E] rounded-lg p-6">
                <h3 className="text-xl font-light text-white mb-6">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="text-white font-medium">Email Notifications</h4>
                        <p className="text-gray-400 text-sm">Receive updates about your themes</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-light text-white mb-6">Change Password</h3>
            
            {passwordError && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{passwordError}</p>
              </div>
            )}
            
            {passwordSuccess && (
              <div className="mb-4 p-3 bg-green-900/20 border border-green-500/50 rounded-lg">
                <p className="text-green-400 text-sm">{passwordSuccess}</p>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => {
                    setPasswordData({...passwordData, currentPassword: e.target.value});
                    if (passwordError) setPasswordError('');
                  }}
                  required
                  className="w-full px-4 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => {
                    setPasswordData({...passwordData, newPassword: e.target.value});
                    if (passwordError) setPasswordError('');
                  }}
                  required
                  className="w-full px-4 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => {
                    setPasswordData({...passwordData, confirmPassword: e.target.value});
                    if (passwordError) setPasswordError('');
                  }}
                  required
                  className="w-full px-4 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({currentPassword: '', newPassword: '', confirmPassword: ''});
                    setPasswordError('');
                    setPasswordSuccess('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  {isChangingPassword ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-6">
              <Trash2 className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-light text-white">Deactivate Account</h3>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-300 mb-4">
                This will deactivate your account and log you out immediately. Your data will be preserved and you can contact support to reactivate your account if needed.
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Type <span className="text-red-400 font-mono">DEACTIVATE</span> to confirm.
              </p>
              
              {deleteError && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm">{deleteError}</p>
                </div>
              )}

              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => {
                  setDeleteConfirmation(e.target.value);
                  if (deleteError) setDeleteError('');
                }}
                placeholder="Type DEACTIVATE to confirm"
                className="w-full px-4 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                  setDeleteError('');
                }}
                className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeletingAccount || deleteConfirmation !== 'DEACTIVATE'}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                {isDeletingAccount ? 'Deactivating...' : 'Deactivate Account'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Editing Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E1E1E] rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-800/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-light text-white">Edit Profile</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Profile Image
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                    {imagePreview ? (
                      <Image 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        width={80}
                        height={80}
                      />
                    ) : user.profile_image ? (
                      <Image 
                        src={user.profile_image} 
                        alt={user.username}
                        className="w-full h-full object-cover"
                        width={80}
                        height={80}
                        onError={(e) => {
                          // Hide the image if it fails to load, showing the fallback
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}
                    {(!imagePreview && (!user.profile_image || user.profile_image === '')) && (
                      <span className="text-white text-lg font-medium">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => document.getElementById('modal-image-input')?.click()}
                      className="px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors text-sm"
                    >
                      {imagePreview ? 'Change Image' : 'Upload Image'}
                    </button>
                    <input
                      id="modal-image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    {imagePreview && (
                      <button
                        onClick={handleImageUpload}
                        disabled={isUploadingImage}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
                      >
                        {isUploadingImage ? 'Uploading...' : 'Save Image'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  value={editProfile.username}
                  onChange={(e) => setEditProfile({...editProfile, username: e.target.value})}
                  className="w-full px-4 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Enter username"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={editProfile.bio}
                  onChange={(e) => setEditProfile({...editProfile, bio: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={editProfile.location}
                  onChange={(e) => setEditProfile({...editProfile, location: e.target.value})}
                  className="w-full px-4 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Where are you from?"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={editProfile.website}
                  onChange={(e) => setEditProfile({...editProfile, website: e.target.value})}
                  className="w-full px-4 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="https://your-website.com"
                />
              </div>

              {/* Social Links */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Social Links
                </label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={editProfile.social_links.twitter}
                    onChange={(e) => setEditProfile({
                      ...editProfile, 
                      social_links: {...editProfile.social_links, twitter: e.target.value}
                    })}
                    className="w-full px-4 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Twitter URL"
                  />
                  <input
                    type="url"
                    value={editProfile.social_links.github}
                    onChange={(e) => setEditProfile({
                      ...editProfile, 
                      social_links: {...editProfile.social_links, github: e.target.value}
                    })}
                    className="w-full px-4 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="GitHub URL"
                  />
                  <input
                    type="text"
                    value={editProfile.social_links.discord}
                    onChange={(e) => setEditProfile({
                      ...editProfile, 
                      social_links: {...editProfile.social_links, discord: e.target.value}
                    })}
                    className="w-full px-4 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Discord Username"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isUpdatingProfile}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  {isUpdatingProfile ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
} 