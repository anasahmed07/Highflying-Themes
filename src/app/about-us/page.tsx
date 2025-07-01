import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Switch Theme",
  description: "Learn about Switch Theme, our mission, and our community for sharing and discovering Nintendo 3DS/2DS custom themes.",
  openGraph: {
    title: "About Us | Switch Theme",
    description: "Learn about Switch Theme, our mission, and our community for sharing and discovering Nintendo 3DS/2DS custom themes.",
    url: "https://switchthemes.vercel.app/about-us",
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
    title: "About Us | Switch Theme",
    description: "Learn about Switch Theme, our mission, and our community for sharing and discovering Nintendo 3DS/2DS custom themes.",
    images: ["/switch-theme-logo.svg"],
  },
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mix-blend-difference text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            About Switch Theme
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A gentle community for Nintendo enthusiasts to share and discover custom themes
          </p>
        </div>

        <div className="mix-blend-difference grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              We believe in the power of personalization. Switch Theme was created to provide 
              a peaceful space where Nintendo fans can express their creativity through custom themes 
              for their 3DS, 2DS, N3DS, and N2DS systems.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our platform celebrates the art of theme creation while fostering a supportive 
              community of designers and enthusiasts.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-light text-white mb-4">What We Offer</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-emerald-400 mr-3">•</span>
                <span>Curated collection of high-quality themes</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-3">•</span>
                <span>Easy upload and sharing system</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-3">•</span>
                <span>Support for CFW and Homebrew systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-3">•</span>
                <span>Community-driven feedback and ratings</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-light text-white mb-4">Join Our Community</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Whether you&apos;re a seasoned theme creator or just starting your journey, 
            there&apos;s a place for you here. Share your creations, discover new themes, 
            and connect with fellow Nintendo enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login-signup"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 text-center"
            >
              Start Creating
            </Link>
            <Link
              href="/themes"
              className="px-8 py-3 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors duration-200 text-center"
            >
              Browse Themes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
  