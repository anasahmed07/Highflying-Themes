import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SplashCursor from '@/components/blocks/SplashCursor'


export const metadata: Metadata = {
  title: "Highflying Themes",
  description: "A platform for uploading, sharing, and downloading custom themes for Nintendo 3DS, 2DS, N3DS, and N2DS systems with CFW or Homebrew access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-[#060606] text-white  max-w-7xl mx-auto font-mono'>
      <SplashCursor />
      <Header />
      {children}
      <Footer />
      </body>
    </html>
  );
}
