import ThemePageClient from './ThemePageClient';

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