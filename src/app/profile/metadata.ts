import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Profile | Switch Theme",
  description: "View and manage your Switch Theme profile. Edit your info, upload a profile image, and see your uploaded Nintendo 3DS/2DS themes.",
  openGraph: {
    title: "Your Profile | Switch Theme",
    description: "View and manage your Switch Theme profile. Edit your info, upload a profile image, and see your uploaded Nintendo 3DS/2DS themes.",
    url: "https://switchthemes.vercel.app/profile",
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
    title: "Your Profile | Switch Theme",
    description: "View and manage your Switch Theme profile. Edit your info, upload a profile image, and see your uploaded Nintendo 3DS/2DS themes.",
    images: ["/switch-theme-logo.svg"],
  },
}; 