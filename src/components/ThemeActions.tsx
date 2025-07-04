"use client";
import { Download, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ThemeActionsProps {
  themeId: number;
  themeName: string;
}

export function ThemeActions({ themeId, themeName }: ThemeActionsProps) {
  const [downloading, setDownloading] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleDownloadClick = () => {
    setDownloading(true);
    // Reset state after a short delay (since we can't detect actual download finish)
    setTimeout(() => setDownloading(false), 4000);
  };

  const handleLike = () => setLiked(!liked);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: themeName,
          text: `Check out this amazing theme: ${themeName}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Copy failed:', error);
      }
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <Link
          href={`/themes/download/${themeId}`}
          onClick={handleDownloadClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            downloading
              ? 'bg-blue-400 text-white cursor-wait'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          download
        >
          <Download size={18} />
          {downloading ? 'Downloading...' : 'Download'}
        </Link>
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            liked
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          Like
        </button>
      </div>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
      >
        <Share2 size={18} />
        Share
      </button>
    </div>
  );
}