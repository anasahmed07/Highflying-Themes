import ThemeCard from "@/components/themeCard";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <main className="h-[80vh]">
        <div className="flex flex-col items-center justify-center h-full">
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
        </div>
      </main>

      <section className="py-16">
        <div className="mix-blend-difference text-center mb-12">
          <h2 className="text-3xl font-light text-white mb-4">
            Featured Themes
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Handpicked themes from our community of talented creators
          </p>
        </div>
        <div className="px-2 sm:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-3 gap-y-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <ThemeCard key={i} />
          ))}
        </div>
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
        <div className="px-2 sm:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-3 gap-y-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <ThemeCard key={i} />
          ))}
        </div>
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
