import { notFound } from 'next/navigation';
import Image from 'next/image';
import { User, BarChart3, Palette, MapPin, Globe, Download, Calendar, Heart, Users } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from "next";

interface UserProfile {
  _id: string;
  username: string;
  bio?: string;
  location?: string;
  website?: string;
  social_links?: Record<string, string>;
  profile_image?: string;
  stats?: {
    themes_uploaded?: number;
    total_downloads?: number;
    followers?: number;
    following?: number;
  };
  recent_uploads?: Array<{
    _id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    downloads?: number;
    created_at: string;
  }>;
}

async function getUserProfile(user: string): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/public-profile/${encodeURIComponent(user)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ user: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { user } = await params;
  let profile: UserProfile | null = null;
  try {
    profile = await getUserProfile(user);
  } catch {
    // fallback to generic metadata if user not found
    return {
      title: "User Profile | Switch Theme",
      description: "View a user's public profile and their shared Nintendo 3DS/2DS themes.",
      openGraph: {
        title: "User Profile | Switch Theme",
        description: "View a user's public profile and their shared Nintendo 3DS/2DS themes.",
        url: `https://switchthemes.vercel.app/profile/${user}`,
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
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: "User Profile | Switch Theme",
        description: "View a user's public profile and their shared Nintendo 3DS/2DS themes.",
        images: ["/switch-theme-logo.svg"],
      },
    };
  }

  const profileImage = profile?.profile_image || "/switch-theme-logo.svg";
  const title = profile?.username ? `${profile.username} | Switch Theme` : "User Profile | Switch Theme";
  const description = profile?.bio || "View a user's public profile and their shared Nintendo 3DS/2DS themes.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://switchthemes.vercel.app/profile/${user}`,
      siteName: "Switch Theme",
      images: [
        {
          url: profileImage,
          width: 512,
          height: 512,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [profileImage],
    },
  };
}

export default async function PublicProfilePage({ params }: { params: Promise<{ user: string }> }) {
  const { user } = await params;
  const profile = await getUserProfile(user);
  if (!profile) return notFound();

  return (
    <main className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-[#1E1E1E] rounded-lg border border-gray-800/50 p-6 mb-6">
          <div className="flex items-center gap-6">
            {profile.profile_image ? (
              <Image
                src={profile.profile_image}
                alt={profile.username + "'s profile image"}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-800 shadow-lg"
                width={96}
                height={96}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                <User className="w-12 h-12" />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{profile.username}</h1>
              {profile.bio && <p className="text-gray-300 mb-3">{profile.bio}</p>}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </span>
                )}
                {profile.website && (
                  <a 
                    href={profile.website} 
                    className="text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1 transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-4 h-4" />
                    {profile.website}
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Social Links */}
          {profile.social_links && Object.keys(profile.social_links).length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Social Links</h3>
              <div className="flex gap-3">
                {Object.entries(profile.social_links).map(([platform, url]) => (
                  <a 
                    key={platform} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-gray-300 transition-colors"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Two Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Statistics */}
          <div className="bg-[#1E1E1E] rounded-lg border border-gray-800/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
              </div>
              Statistics
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div className="text-2xl font-bold text-emerald-400">
                    {profile.stats?.themes_uploaded || 0}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center justify-center gap-1 mt-1">
                    <Palette className="w-4 h-4" />
                    Themes Uploaded
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div className="text-2xl font-bold text-blue-400">
                    {profile.stats?.total_downloads || 0}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center justify-center gap-1 mt-1">
                    <Download className="w-4 h-4" />
                    Total Downloads
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div className="text-2xl font-bold text-purple-400">
                    {profile.stats?.followers || 0}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center justify-center gap-1 mt-1">
                    <Users className="w-4 h-4" />
                    Followers
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div className="text-2xl font-bold text-orange-400">
                    {profile.stats?.following || 0}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center justify-center gap-1 mt-1">
                    <Heart className="w-4 h-4" />
                    Following
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Recent Uploads */}
          <div className="bg-[#1E1E1E] rounded-lg border border-gray-800/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-purple-400" />
              </div>
              Recent Uploads
            </h2>
            <div className="space-y-3">
              {profile.recent_uploads && profile.recent_uploads.length > 0 ? (
                profile.recent_uploads.slice(0, 5).map((upload) => (
                  <div key={upload._id} className="p-3 border border-gray-800 rounded-lg hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-start gap-3">
                      {upload.thumbnail && (
                        <Image
                          src={upload.thumbnail}
                          alt={upload.title}
                          className="w-12 h-12 rounded object-cover flex-shrink-0"
                          width={48}
                          height={48}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">{upload.title}</h3>
                        {upload.description && (
                          <p className="text-sm text-gray-400 truncate">{upload.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {upload.downloads || 0} downloads
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(upload.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="w-8 h-8" />
                  </div>
                  <p className="text-sm">No themes uploaded yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 