import { ArrowLeft, Star, Eye, Calendar } from 'lucide-react';
import Link from 'next/link';
import { apiService, ITheme } from '@/lib/api';
import { ThemeActions } from '@/components/ThemeActions';
import type { Metadata} from "next";
import QRCode from '@/components/QRCode';
import Image from 'next/image';

async function getUserProfile(username: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/public-profile/${encodeURIComponent(username)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function ThemePage({ params }: { params: Promise<{ id: number }>}) {
  const { id } = await params;
  let themeData: ITheme | null = null;
  try {
    themeData = await apiService.getThemeById(id);
  } catch {
    return <div className="text-center text-red-500 py-20">Theme not found.</div>;
  }

  const authorAvatar = themeData.author_name ? themeData.author_name[0].toUpperCase() : '?';

  const authorProfile = await getUserProfile(themeData.author_name);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
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

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Theme Header */}
            <div className="bg-[#1E1E1E] rounded-lg p-8">
              <div className="flex items-start gap-6 mb-6">
                {/* Theme Icon */}
                <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                  {themeData.icon_b64 ? (
                    <Image src={`data:image/png;base64,${themeData.icon_b64}`} alt="Theme Icon" width={80} height={80} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl text-white font-bold">🎨</span>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-light text-white mb-2 flex items-center gap-2">
                    {themeData.name || 'Untitled Theme'}
                  </h1>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-gray-400 text-sm">Updated {themeData.updated_at ? new Date(themeData.updated_at).toLocaleDateString() : ''}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span className="text-gray-400 text-sm">0 views</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-400 text-sm">{(themeData.download_count || 0).toLocaleString()} downloads</span>
                    </div>
                  </div>


                </div>
              </div>
         
              <div className="relative">
                <div className="w-full aspect-[16/18] bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                  <Image src={`data:image/png;base64,${themeData.preview_b64}`} alt={themeData.name} height={400} width={350} className="object-contain w-full h-full" />
                </div>
                {/* QR Code overlay - appears on hover */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <div className="p-3 rounded-lg shadow-lg">
                    <QRCode value={`/themes/download/${id}`} size={300} className="mx-auto" />
                    <p className="text-sm text-white mt-3 text-center font-medium">Scan to download</p>
                  </div>
                </div>
              </div>
            
              <p className="text-gray-300 leading-relaxed mb-4">{themeData.description || 'No description provided.'}</p>
              <ThemeActions themeId={id} themeName={themeData.name || 'theme'} />
            </div>
            {/* Features */}
            <div className="bg-[#1E1E1E] rounded-lg p-8">
              <h2 className="text-2xl font-light text-white mb-6">Features</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300">{themeData.bgm_info ? `BGM: ${themeData.bgm_info}` : 'No custom BGM'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300">Preview image included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300">Compatible with 3DS/2DS</span>
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Author Info */}
            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h3 className="text-lg font-light text-white mb-4">Created by</h3>
              <div className="flex items-center space-x-3">
                <Link href={`/profile/${themeData.author_name}`}>
                  {authorProfile?.profile_image ? (
                    <Image
                      src={authorProfile.profile_image}
                      alt={themeData.author_name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-2xl">{authorAvatar}</span>
                    </div>
                  )}
                </Link>
                <div>
                  <Link href={`/profile/${themeData.author_name}`}>
                    <p className="text-white font-medium hover:underline">{themeData.author_name}</p>
                  </Link>
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
                  <span className="text-white">{themeData.tags && themeData.tags.length > 0 ? themeData.tags[0] : 'General'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white">5.0</span>
                    <span className="text-gray-400 ml-1">(0)</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Compatibility</span>
                  <div className="flex space-x-1">
                    {["3DS", "2DS", "N3DS", "N2DS"].map((system, index) => (
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
                {themeData.tags && themeData.tags.length > 0 ? themeData.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-700 text-xs text-white rounded-full">
                    #{tag}
                  </span>
                )) : <span className="text-gray-400">No tags</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: number }> }
): Promise<Metadata> {
  const { id } = await params;
  let themeData: ITheme | null = null;
  try {
    themeData = await apiService.getThemeById(id);
  } catch {
    // fallback to generic metadata if theme not found
    return {
      title: "Theme Details | Switch Theme",
      description: "View details, screenshots, and download options for this custom Nintendo 3DS/2DS theme on Switch Theme.",
      openGraph: {
        title: "Theme Details | Switch Theme",
        description: "View details, screenshots, and download options for this custom Nintendo 3DS/2DS theme on Switch Theme.",
        url: `https://switchthemes.vercel.app/themes/${id}`,
        siteName: "Switch Theme",
        images: [
          {
            url: "/switch-theme-logo.svg",
            width: 512,
            height: 512,
            alt: "Switch Theme Logo",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Theme Details | Switch Theme",
        description: "View details, screenshots, and download options for this custom Nintendo 3DS/2DS theme on Switch Theme.",
        images: ["/switch-theme-logo.svg"],
      },
    };
  }

  const previewImage = themeData.preview_b64
    ? `data:image/png;base64,${themeData.preview_b64}`
    : "/switch-theme-logo.svg";
  const title = themeData.name || "Theme Details | Switch Theme";
  const description = themeData.description || "View details, screenshots, and download options for this custom Nintendo 3DS/2DS theme on Switch Theme.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://switchthemes.vercel.app/themes/${id}`,
      siteName: "Switch Theme",
      images: [
        {
          url: previewImage,
          width: 512,
          height: 512,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [previewImage],
    },
  };
} 