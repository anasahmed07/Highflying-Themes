import ThemeCard from "@/components/themeCard";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ImageTrail from "@/components/blocks/ImageTrail";
import ThemeCardGroup from "@/components/ThemeCardGroup";

export const metadata: Metadata = {
  title: "Switch Theme | Nintendo 3DS/2DS Custom Themes Platform",
  description: "Discover, create, and share beautiful custom themes for your Nintendo 3DS, 2DS, N3DS, and N2DS. Join the Switch Theme community for curated, user-submitted themes and easy downloads.",
  openGraph: {
    title: "Switch Theme | Nintendo 3DS/2DS Custom Themes Platform",
    description: "Discover, create, and share beautiful custom themes for your Nintendo 3DS, 2DS, N3DS, and N2DS. Join the Switch Theme community for curated, user-submitted themes and easy downloads.",
    url: "https://switchthemes.vercel.app/",
    siteName: "Switch Theme",
    images: [
      {
        url: "/banner.png",
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
    title: "Switch Theme | Nintendo 3DS/2DS Custom Themes Platform",
    description: "Discover, create, and share beautiful custom themes for your Nintendo 3DS, 2DS, N3DS, and N2DS. Join the Switch Theme community for curated, user-submitted themes and easy downloads.",
    images: ["/banner.png"],
  },
};

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION with overlay */}
      <section className="relative h-[80vh] flex items-center justify-center">
        {/* ImageTrail overlay */}
        <div className="absolute inset-0 z-10">
          <ImageTrail
            items={[
              'https://switchthemes.vercel.app/theme-images/1.png',
              'https://switchthemes.vercel.app/theme-images/2.png',
              'https://switchthemes.vercel.app/theme-images/3.png',
              'https://switchthemes.vercel.app/theme-images/4.png',
              'https://switchthemes.vercel.app/theme-images/5.png',
              'https://switchthemes.vercel.app/theme-images/6.png',
              'https://switchthemes.vercel.app/theme-images/7.png',
              'https://switchthemes.vercel.app/theme-images/8.png',
            ]}
            variant={2}
          />
        </div>
        {/* Main hero content */}
        <main className="select-none mix-blend-difference relative z-20 flex flex-col items-center justify-center w-full">
          <Image
            src={"/switch-theme-logo.svg"}
            alt="/switch-theme-logo"
            height={140}
            width={300}
            className="mb-6 mix-blend-difference"
          />
          <p className="mix-blend-difference text-xl text-center text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Discover, create, and share beautiful custom themes for your Nintendo handheld
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/themes">
              <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium">
                Browse Themes
              </button>
            </Link>
            <Link href="/upload-theme">
              <button className="px-8 py-4 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors duration-200 font-medium">
                Upload Your Theme
              </button>
            </Link>
          </div>
        </main>
      </section>

      <section className="py-16">
        <div className="mix-blend-difference text-center mb-12">
          <h2 className="text-3xl font-light text-white mb-4">
            Featured Themes
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Handpicked themes from our community of talented creators
          </p>
        </div>
        <ThemeCardGroup>
          {[
            {
              href: "/themes/1",
              title: "Minimal Dark",
              description: "A clean and minimal dark theme with subtle animations",
              rating: 4.8,
              isNew: true,
              author: "Artist",
              authorAvatar: "A",
              system: "3DS",
              downloads: 1200,
              imageUrl: "/theme-images/1.png",
            },
            {
              href: "/themes/2",
              title: "Retro Wave",
              description: "A retro-inspired theme with neon colors and synth vibes",
              rating: 4.7,
              isNew: false,
              author: "SynthMaster",
              authorAvatar: "S",
              system: "N3DS",
              downloads: 980,
              imageUrl: "/theme-images/2.png",
            },
            {
              href: "/themes/3",
              title: "Nature Bliss",
              description: "Relaxing nature visuals and calming palette",
              rating: 4.9,
              isNew: true,
              author: "Leafy",
              authorAvatar: "L",
              system: "2DS",
              downloads: 1500,
              imageUrl: "/theme-images/3.png",
            },
            {
              href: "/themes/4",
              title: "Anime Dreams",
              description: "Anime-inspired theme for fans of all ages",
              rating: 4.6,
              isNew: false,
              author: "Otaku",
              authorAvatar: "O",
              system: "3DS",
              downloads: 1100,
              imageUrl: "/theme-images/4.png",
            },
            {
              href: "/themes/5",
              title: "Abstract Flow",
              description: "Dynamic abstract shapes and vibrant colors",
              rating: 4.5,
              isNew: false,
              author: "Painter",
              authorAvatar: "P",
              system: "N2DS",
              downloads: 870,
              imageUrl: "/theme-images/5.png",
            },
          ].map((props, i) => (
            <div className="inline-block max-w-52 md:max-w-72" key={i}>
              <ThemeCard {...props} />
            </div>
          ))}
        </ThemeCardGroup>
      </section>

      <section className="py-16">
        <div className="mix-blend-difference text-center mb-12">
          <h2 className="text-3xl font-light text-white mb-4">
            Latest Themes
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Fresh themes uploaded by our community
          </p>
        </div>
        <ThemeCardGroup>
          {[
            {
              href: "/themes/6",
              title: "Pixel Art Fun",
              description: "Classic pixel art for a nostalgic feel",
              rating: 4.4,
              isNew: true,
              author: "PixelGuy",
              authorAvatar: "P",
              system: "3DS",
              downloads: 600,
              imageUrl: "/theme-images/6.png",
            },
            {
              href: "/themes/7",
              title: "Oceanic",
              description: "Blue tones and ocean waves for a chill vibe",
              rating: 4.3,
              isNew: false,
              author: "WaveRider",
              authorAvatar: "W",
              system: "2DS",
              downloads: 720,
              imageUrl: "/theme-images/7.png",
            },
            {
              href: "/themes/8",
              title: "Space Explorer",
              description: "Explore the galaxy with this cosmic theme",
              rating: 4.8,
              isNew: true,
              author: "Astro",
              authorAvatar: "A",
              system: "N3DS",
              downloads: 1340,
              imageUrl: "/theme-images/8.png",
            },
            {
              href: "/themes/9",
              title: "Pastel Pop",
              description: "Soft pastel colors for a cute look",
              rating: 4.2,
              isNew: false,
              author: "Candy",
              authorAvatar: "C",
              system: "3DS",
              downloads: 540,
              imageUrl: "/theme-images/1.png",
            },
            {
              href: "/themes/10",
              title: "Monochrome",
              description: "Sleek black and white minimalism",
              rating: 4.1,
              isNew: false,
              author: "Mono",
              authorAvatar: "M",
              system: "N2DS",
              downloads: 410,
              imageUrl: "/theme-images/2.png",
            },
          ].map((props, i) => (
            <div className="inline-block max-w-52 md:max-w-72" key={i}>
              <ThemeCard {...props} />
            </div>
          ))}
        </ThemeCardGroup>
      </section>

      <section className="py-16 bg-[#1E1E1E] rounded-lg mx-4 mb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-white mb-4">
              Why Choose Switch Theme?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join thousands of Nintendo enthusiasts in our growing community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-2">Curated Quality</h3>
              <p className="text-gray-300 text-sm">
                Every theme is carefully reviewed to ensure the best experience
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-2">Active Community</h3>
              <p className="text-gray-300 text-sm">
                Connect with fellow theme creators and enthusiasts
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-2">Easy Installation</h3>
              <p className="text-gray-300 text-sm">
                Simple download and installation process for all themes
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="mix-blend-difference text-3xl font-light text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="mix-blend-difference text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community and start exploring thousands of custom themes for your Nintendo handheld
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/themes">
              <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium">
                Explore Themes
              </button>
            </Link>
            <Link href="/about-us">
              <button className="px-8 py-4 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors duration-200 font-medium">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
