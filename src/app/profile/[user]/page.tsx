import { notFound } from 'next/navigation';
import Image from 'next/image';

interface UserProfile {
  _id: string;
  username: string;
  bio?: string;
  location?: string;
  website?: string;
  social_links?: Record<string, string>;
  profile_image?: string;
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

export default async function PublicProfilePage({ params }: { params: Promise<{ user: string }> }) {
  const { user } = await params;
  const profile = await getUserProfile(user);
  if (!profile) return notFound();

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <div className="flex flex-col items-center gap-4">
        {profile.profile_image && (
          <Image
            src={profile.profile_image}
            alt={profile.username + "'s profile image"}
            className="w-32 h-32 rounded-full object-cover border"
            width={128}
            height={128}
          />
        )}
        <h1 className="text-3xl font-bold">{profile.username}</h1>
        {profile.bio && <p className="text-gray-600 text-center">{profile.bio}</p>}
        {profile.location && <p className="text-gray-500">📍 {profile.location}</p>}
        {profile.website && (
          <a href={profile.website} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            {profile.website}
          </a>
        )}
        {profile.social_links && Object.keys(profile.social_links).length > 0 && (
          <div className="flex gap-2 mt-2">
            {Object.entries(profile.social_links).map(([platform, url]) => (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 