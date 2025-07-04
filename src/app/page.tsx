import ThemeCard from "@/components/themeCard";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ImageTrail from "@/components/blocks/ImageTrail";
import ThemeCardGroup from "@/components/ThemeCardGroup";
import { apiService } from "@/lib/api";

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

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function fetchThemes(limit = 10) {
  'use server';
  return apiService.getThemes(1, limit);
}

export default async function HomePage() {
  // Fetch featured and latest themes (for demo, just fetch two pages)
  const { themes: featuredThemes } = await fetchThemes(5);
  const { themes: latestThemes } = await fetchThemes(5);

  return (
    <>
      {/* HERO SECTION with overlay */}
      <section className="relative h-[80vh] flex items-center justify-center">
        {/* ImageTrail overlay */}
        <div className="absolute inset-0 z-10">
          <ImageTrail
            items={featuredThemes.map(theme => theme.preview_b64 ? `data:image/png;base64,${theme.preview_b64}` : '/theme-images/1.png')}
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
          {featuredThemes.map((theme) => (
            <div className="inline-block max-w-52 md:max-w-72" key={theme.theme_id}>
              <ThemeCard
                href={`/themes/${theme.theme_id}`}
                title={theme.name}
                description={theme.short_description}
                rating={4.5}
                isNew={false}
                author={theme.author_name}
                authorAvatar={theme.author_name[0]}
                downloads={theme.download_count || 0}
                imageUrl={theme.preview_b64 ? `data:image/png;base64,${theme.preview_b64}` : undefined}
              />
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
          {latestThemes.map((theme) => (
            <div className="inline-block max-w-52 md:max-w-72" key={theme.theme_id}>
              <ThemeCard
                href={`/themes/${theme.theme_id}`}
                title={theme.name}
                description={theme.short_description}
                rating={4.5}
                isNew={false}
                author={theme.author_name}
                authorAvatar={theme.author_name[0]}
                downloads={theme.download_count || 0}
                imageUrl={theme.preview_b64 ? `data:image/png;base64,${theme.preview_b64}` : undefined}
              />
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
