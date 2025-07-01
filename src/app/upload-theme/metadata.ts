import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Theme | Switch Theme",
  description: "Share your custom Nintendo 3DS/2DS theme with the Switch Theme community. Upload your theme, add details, and help others personalize their consoles.",
  openGraph: {
    title: "Upload Theme | Switch Theme",
    description: "Share your custom Nintendo 3DS/2DS theme with the Switch Theme community. Upload your theme, add details, and help others personalize their consoles.",
    url: "https://switchthemes.vercel.app/upload-theme",
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
    title: "Upload Theme | Switch Theme",
    description: "Share your custom Nintendo 3DS/2DS theme with the Switch Theme community. Upload your theme, add details, and help others personalize their consoles.",
    images: ["/switch-theme-logo.svg"],
  },
}; 