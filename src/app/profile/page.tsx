'use client'
import { useState } from 'react';
import { User, Settings, Upload, Heart, Download, Eye, Edit, Camera, Bell, Shield, Palette } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    username: "@alexj",
    email: "alex.johnson@example.com",
    avatar: "AJ",
    bio: "Passionate theme creator and 3DS enthusiast. Love creating minimal and elegant designs that enhance the gaming experience.",
    joinDate: "March 2023",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
    stats: {
      themes: 12,
      downloads: 8542,
      likes: 2341,
      views: 15678
    }
  };

  const uploadedThemes = [
    {
      id: 1,
      name: "Minimal Dark Elegance",
      downloads: 1247,
      rating: 4.8,
      category: "Minimal",
      updatedAt: "2 days ago"
    },
    {
      id: 2,
      name: "Ocean Breeze",
      downloads: 892,
      rating: 4.6,
      category: "Nature",
      updatedAt: "1 week ago"
    },
    {
      id: 3,
      name: "Retro Gaming",
      downloads: 1567,
      rating: 4.9,
      category: "Gaming",
      updatedAt: "3 weeks ago"
    }
  ];

  const likedThemes = [
    {
      id: 4,
      name: "Cyberpunk Neon",
      author: "TechCreator",
      downloads: 2341,
      rating: 4.7
    },
    {
      id: 5,
      name: "Forest Serenity",
      author: "NatureLover",
      downloads: 987,
      rating: 4.5
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'themes', label: 'My Themes', icon: Upload },
    { id: 'liked', label: 'Liked Themes', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-[#1E1E1E] rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-medium">{user.avatar}</span>
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                <Camera className="w-4 h-4 text-gray-300" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-3xl font-light text-white">{user.name}</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
              
              <p className="text-gray-400 mb-2">{user.username}</p>
              <p className="text-gray-300 mb-4">{user.bio}</p>
              
              <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <span>📍 {user.location}</span>
                </div>
                <div className="flex items-center">
                  <span>📅 Joined {user.joinDate}</span>
                </div>
                {user.website && (
                  <a href={user.website} className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    🌐 Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1E1E1E] rounded-lg p-6 text-center">
            <div className="text-2xl font-light text-white mb-2">{user.stats.themes}</div>
            <div className="text-gray-400 text-sm">Themes</div>
          </div>
          <div className="bg-[#1E1E1E] rounded-lg p-6 text-center">
            <div className="text-2xl font-light text-white mb-2">{user.stats.downloads.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Downloads</div>
          </div>
          <div className="bg-[#1E1E1E] rounded-lg p-6 text-center">
            <div className="text-2xl font-light text-white mb-2">{user.stats.likes.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Likes</div>
          </div>
          <div className="bg-[#1E1E1E] rounded-lg p-6 text-center">
            <div className="text-2xl font-light text-white mb-2">{user.stats.views.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Views</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#1E1E1E] rounded-lg p-2 mb-8">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-[#1E1E1E] rounded-lg p-6">
                <h3 className="text-xl font-light text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Uploaded "Ocean Breeze" theme</p>
                      <p className="text-gray-400 text-xs">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Liked "Cyberpunk Neon" theme</p>
                      <p className="text-gray-400 text-xs">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Updated "Minimal Dark Elegance"</p>
                      <p className="text-gray-400 text-xs">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#1E1E1E] rounded-lg p-6">
                <h3 className="text-xl font-light text-white mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/upload-theme"
                    className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-emerald-400" />
                    <span className="text-white">Upload New Theme</span>
                  </Link>
                  <button className="w-full flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <Palette className="w-5 h-5 text-blue-400" />
                    <span className="text-white">Customize Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <Bell className="w-5 h-5 text-yellow-400" />
                    <span className="text-white">Notification Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'themes' && (
            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light text-white">My Themes</h3>
                <Link
                  href="/upload-theme"
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Theme</span>
                </Link>
              </div>
              
              <div className="space-y-4">
                {uploadedThemes.map((theme) => (
                  <div key={theme.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{theme.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {theme.downloads}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {theme.rating} ★
                        </span>
                        <span>{theme.category}</span>
                        <span>Updated {theme.updatedAt}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/themes/${theme.id}`}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'liked' && (
            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h3 className="text-xl font-light text-white mb-6">Liked Themes</h3>
              <div className="space-y-4">
                {likedThemes.map((theme) => (
                  <div key={theme.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{theme.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>by {theme.author}</span>
                        <span className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {theme.downloads}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {theme.rating} ★
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/themes/${theme.id}`}
                      className="px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Account Settings */}
              <div className="bg-[#1E1E1E] rounded-lg p-6">
                <h3 className="text-xl font-light text-white mb-6">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Display Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Username</label>
                    <input
                      type="text"
                      defaultValue={user.username}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Bio</label>
                    <textarea
                      defaultValue={user.bio}
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-[#1E1E1E] rounded-lg p-6">
                <h3 className="text-xl font-light text-white mb-6">Privacy & Security</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Profile Visibility</h4>
                      <p className="text-gray-400 text-sm">Make your profile visible to other users</p>
                    </div>
                    <button className="w-12 h-6 bg-emerald-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Email Notifications</h4>
                      <p className="text-gray-400 text-sm">Receive email updates about your themes</p>
                    </div>
                    <button className="w-12 h-6 bg-gray-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                      <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 