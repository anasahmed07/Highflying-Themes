'use client'
import { useState } from 'react';
import { ArrowLeft, Download, Heart, Share2, Star, Eye, MessageCircle, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Theme {
  id: string;
  name: string;
  description: string;
  author: string;
  authorAvatar: string;
  category: string;
  compatibility: string[];
  rating: number;
  reviewCount: number;
  downloadCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  features: string[];
  screenshots: string[];
}

interface ThemePageClientProps {
  theme: Theme;
}

export default function ThemePageClient({ theme }: ThemePageClientProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [downloadCount, setDownloadCount] = useState(theme.downloadCount);

  const handleDownload = () => {
    setDownloadCount(prev => prev + 1);
    // In a real app, this would trigger the actual download
    console.log('Downloading theme:', theme.id);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: theme.name,
        text: `Check out this amazing theme: ${theme.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/themes"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Themes
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Theme Header */}
            <div className="bg-[#1E1E1E] rounded-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-light text-white mb-4">{theme.name}</h1>
                  <p className="text-gray-300 leading-relaxed mb-6">{theme.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Updated {theme.updatedAt}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      <span>{theme.viewCount.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      <span>{downloadCount.toLocaleString()} downloads</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Theme
                </button>
                <button
                  onClick={handleLike}
                  className={`flex items-center justify-center px-6 py-3 border rounded-lg transition-colors duration-200 font-medium ${
                    isLiked 
                      ? 'border-red-500 text-red-400 hover:bg-red-500/10' 
                      : 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center px-6 py-3 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Screenshots */}
            <div className="bg-[#1E1E1E] rounded-lg p-8">
              <h2 className="text-2xl font-light text-white mb-6">Screenshots</h2>
              <div className="grid grid-cols-2 gap-4">
                {theme.screenshots.map((screenshot, index) => (
                  <div key={index} className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Screenshot {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-[#1E1E1E] rounded-lg p-8">
              <h2 className="text-2xl font-light text-white mb-6">Features</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {theme.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h3 className="text-lg font-light text-white mb-4">Created by</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{theme.authorAvatar}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{theme.author}</p>
                  <p className="text-sm text-gray-400">Theme Creator</p>
                </div>
              </div>
            </div>

            {/* Theme Info */}
            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h3 className="text-lg font-light text-white mb-4">Theme Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white">{theme.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white">{theme.rating}</span>
                    <span className="text-gray-400 ml-1">({theme.reviewCount})</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Compatibility</span>
                  <div className="flex space-x-1">
                    {theme.compatibility.map((system, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700 text-xs text-white rounded">
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h3 className="text-lg font-light text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {theme.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-700 text-sm text-gray-300 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Themes */}
            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h3 className="text-lg font-light text-white mb-4">More from this creator</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-gray-700 rounded"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Theme {i}</p>
                      <p className="text-gray-400 text-xs">4.5 ★ (23)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 