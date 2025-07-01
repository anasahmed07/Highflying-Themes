import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login or Sign Up | Switch Theme",
  description: "Sign in or create an account on Switch Theme to upload, share, and download Nintendo 3DS/2DS custom themes. Join our creative community today!",
  openGraph: {
    title: "Login or Sign Up | Switch Theme",
    description: "Sign in or create an account on Switch Theme to upload, share, and download Nintendo 3DS/2DS custom themes. Join our creative community today!",
    url: "https://switchthemes.vercel.app/login-signup",
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
    title: "Login or Sign Up | Switch Theme",
    description: "Sign in or create an account on Switch Theme to upload, share, and download Nintendo 3DS/2DS custom themes. Join our creative community today!",
    images: ["/switch-theme-logo.svg"],
  },
}; 