import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Switch Theme",
  description: "Contact Switch Theme for support, questions, or feedback. Reach out to our team for help with Nintendo 3DS/2DS theme uploads and account issues.",
  openGraph: {
    title: "Contact Us | Switch Theme",
    description: "Contact Switch Theme for support, questions, or feedback. Reach out to our team for help with Nintendo 3DS/2DS theme uploads and account issues.",
    url: "https://switchthemes.vercel.app/contact-us",
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
    title: "Contact Us | Switch Theme",
    description: "Contact Switch Theme for support, questions, or feedback. Reach out to our team for help with Nintendo 3DS/2DS theme uploads and account issues.",
    images: ["/switch-theme-logo.svg"],
  },
}; 