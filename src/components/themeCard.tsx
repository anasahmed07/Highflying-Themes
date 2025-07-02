import Link from "next/link";
import Image from "next/image";
import QRCode from "./QRCode";

export interface ThemeCardProps {
  href: string;
  title: string;
  description: string;
  rating: number;
  isNew?: boolean;
  author: string;
  authorAvatar?: string;
  downloads: number;
  imageUrl?: string;
}

const ThemeCard = ({ href, title, description, rating, isNew = false, author, authorAvatar, downloads, imageUrl,}: ThemeCardProps) => {
  // Extract theme ID from href for download URL
  const themeId = href.split('/').pop();
  const downloadUrl = `/download/${themeId}`;

  return (
    <div className="group w-full rounded-lg hover:translate-y-1 duration-300 transition-all cursor-pointer overflow-hidden">
      {/* Upper section - changes background on hover */}
      <div className="p-3 bg-[#1E1E1E] group-hover:bg-[#2A2A2A] transition-all">
        <Link href={href} className="block">
          <div className="relative">
            <div className="w-full aspect-[16/18] bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
              {imageUrl ? (
                <Image src={imageUrl} alt={title} fill className="object-contain w-full h-full" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-600/20 to-blue-600/20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* QR Code overlay - appears on hover */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
              <div className="p-3 rounded-lg shadow-lg">
                <QRCode value={downloadUrl} size={150} className="mx-auto" />
                <p className="text-sm text-white mt-3 text-center font-medium">Scan to download</p>
              </div>
            </div>
            
            {isNew && (
              <div className="absolute top-2 right-2 z-10">
                <span className="px-2 py-1 bg-emerald-600/80 backdrop-blur-sm text-xs rounded-full text-white">
                  New
                </span>
              </div>
            )}
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">
                {title}
              </h3>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-300">{rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 line-clamp-2">
              {description}
            </p>
          </div>
        </Link>
      </div>
      
      {/* Bottom section - maintains original background color */}
      <div className="p-3 bg-[#1E1E1E]">
        <div className="flex items-center justify-between">
          <Link href={`/profile/${author}`}>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">{authorAvatar || author[0]}</span>
            </div>
            <p className="text-xs text-gray-400 hover:text-emerald-400 transition-colors">{author}</p>
          </div>
          </Link>
          <div className="flex items-center space-x-3 text-xs text-gray-400">
            <button className="flex items-center hover:text-red-400 transition-colors">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              {downloads.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCard;