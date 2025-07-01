import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Themes | Switch Theme",
  description: "Browse and discover thousands of custom Nintendo 3DS/2DS themes created by the Switch Theme community. Filter, search, and download your favorites.",
  openGraph: {
    title: "Browse Themes | Switch Theme",
    description: "Browse and discover thousands of custom Nintendo 3DS/2DS themes created by the Switch Theme community. Filter, search, and download your favorites.",
    url: "https://switchthemes.vercel.app/themes",
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
    title: "Browse Themes | Switch Theme",
    description: "Browse and discover thousands of custom Nintendo 3DS/2DS themes created by the Switch Theme community. Filter, search, and download your favorites.",
    images: ["/switch-theme-logo.svg"],
  },
}; 