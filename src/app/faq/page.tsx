import React from 'react';
import type { Metadata } from "next";

const FAQPage = () => {
  const faqs = [
    {
      question: "What is this site?",
      answer: "This is a site for uploading, sharing, and downloading themes, splashes, and badges for your Nintendo 3DS, 2DS, New Nintendo 3DS, and 2DS systems with homebrew or CFW access."
    },
    {
      question: "How do I use this site, and what are the QR codes for?",
      answer: "Use Anemone to download themes/splashes directly to your console via QR codes on item pages. Alternatively, download the ZIP file and place it in your SD card's themes or splashes folder."
    },
    {
      question: "I uploaded something awaiting approval. How do I get accepted?",
      answer: `New uploads require admin approval for content control.

Asking won't speed up approval.

If your first 5 uploads are accepted, you gain Trusted status, enabling auto-approval for future uploads.

If an item is rejected, you lose Trusted status and must resubmit 5 new items.

Switch Theme reserves the right to reject content for any reason (e.g., ToS violations).`
    },
    {
      question: "What are the upload restrictions?",
      answer: `We reject:

• Official Nintendo themes
• NSFW/sketchy content depicting minors (real or fictional)
• Hate content
• Images of non-famous real people (exceptions: celebrities, internet personalities, stock images).

Consequences:

• Reported stolen themes will be removed, resulting in loss of Trusted status.
• Repeated violations may lead to account termination and content deletion.`
    },
    {
      question: "Why did I lose Trusted status?",
      answer: `Reasons include:

• Uploading multiple versions of the same theme (spam).
• Submitting 5+ themes too quickly (hurts new creators' visibility).
• Uploading rule-breaking content.

Contact support via our Discord (header link) if this seems erroneous.`
    },
    {
      question: "How do I use the search?",
      answer: `Switch Theme supports advanced search commands:

• NSFW:[all/safe/sketchy/nsfw]
• Tag:[tag name]
• User:[username]
• Quotation marks ("exact phrase") for precise results.`
    },
    {
      question: "How can I change my avatar?",
      answer: "We use Gravatar. Register there with the same email used for Switch Theme, then upload your avatar."
    },
    {
      question: "Who do I contact to report abuse?",
      answer: `Use the "Report Content" button for:

• Reuploads of your theme with minor edits.
• Official Nintendo themes.
• Copyright infringement (e.g., unauthorized use of your music/art).

For other issues, join our Discord (header link).`
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mix-blend-difference text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about Switch Theme
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1E1E1E] rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-700"
            >
              <h3 className="text-xl font-light text-white mb-3">
                Q: {faq.question}
              </h3>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-6">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-us"
              className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Contact Us
            </a>
            <a
              href="/terms-of-service"
              className="inline-flex items-center px-8 py-4 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

export const metadata: Metadata = {
  title: "FAQ | Switch Theme",
  description: "Frequently Asked Questions about Switch Theme. Find answers about uploading, sharing, and downloading Nintendo 3DS/2DS themes, account status, and more.",
  openGraph: {
    title: "FAQ | Switch Theme",
    description: "Frequently Asked Questions about Switch Theme. Find answers about uploading, sharing, and downloading Nintendo 3DS/2DS themes, account status, and more.",
    url: "https://switchthemes.vercel.app/faq",
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
    title: "FAQ | Switch Theme",
    description: "Frequently Asked Questions about Switch Theme. Find answers about uploading, sharing, and downloading Nintendo 3DS/2DS themes, account status, and more.",
    images: ["/switch-theme-logo.svg"],
  },
}; 