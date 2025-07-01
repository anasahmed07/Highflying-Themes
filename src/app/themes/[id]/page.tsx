import ThemePageClient from './ThemePageClient';
import type { Metadata } from "next";

interface ThemePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ThemePage({ params }: ThemePageProps) {
  const { id } = await params;

  // Mock theme data - in a real app, this would come from an API
  const theme = {
    id: id,
    name: "Minimal Dark Elegance",
    description: "A sophisticated dark theme with elegant typography and subtle animations. Perfect for users who appreciate clean, minimal design with a touch of sophistication. Features custom icons, smooth transitions, and carefully crafted color palette.",
    author: "ThemeCreator",
    authorAvatar: "TC",
    category: "Minimal",
    compatibility: ["3DS", "2DS", "N3DS", "N2DS"],
    rating: 4.8,
    reviewCount: 156,
    downloadCount: 1247,
    viewCount: 3421,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    tags: ["dark", "minimal", "elegant", "sophisticated"],
    features: [
      "Custom background music",
      "Animated transitions",
      "Custom folder icons",
      "Unique sound effects",
      "Optimized performance"
    ],
    screenshots: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300"
    ]
  };

  return <ThemePageClient theme={theme} />;
}

export const metadata: Metadata = {
  title: "Theme Details | Switch Theme",
  description: "View details, screenshots, and download options for this custom Nintendo 3DS/2DS theme on Switch Theme.",
  openGraph: {
    title: "Theme Details | Switch Theme",
    description: "View details, screenshots, and download options for this custom Nintendo 3DS/2DS theme on Switch Theme.",
    url: "https://switchthemes.vercel.app/themes/[id]", // Replace with dynamic URL if possible
    siteName: "Switch Theme",
    images: [
      {
        url: "/switch-theme-logo.svg", // Replace with theme preview if available
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
    images: ["/switch-theme-logo.svg"], // Replace with theme preview if available
  },
};
// For dynamic OG tags, consider using generateMetadata in the future. 