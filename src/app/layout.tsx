import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SplashCursor from '@/components/blocks/SplashCursor'
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Switch Theme",
  description: "A platform for uploading, sharing, and downloading custom themes for Nintendo 3DS, 2DS, N3DS, and N2DS systems with CFW or Homebrew access.",
  openGraph: {
    title: "Switch Theme",
    description: "A platform for uploading, sharing, and downloading custom themes for Nintendo 3DS, 2DS, N3DS, and N2DS systems with CFW or Homebrew access.",
    url: "https://switchthemes.vercel.app/",
    siteName: "Switch Theme",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Switch Theme Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Switch Theme",
    description: "A platform for uploading, sharing, and downloading custom themes for Nintendo 3DS, 2DS, N3DS, and N2DS systems with CFW or Homebrew access.",
    images: ["/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-[#060606] text-white max-w-7xl mx-auto font-mono'>
        <AuthProvider>
          <SplashCursor />
          <Header />
          {children}
          <Analytics/>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
