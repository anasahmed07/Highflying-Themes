import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Switch Theme",
  description: "Read the Terms of Service for Switch Theme. Understand your rights and responsibilities when using our platform for Nintendo 3DS/2DS theme sharing.",
  openGraph: {
    title: "Terms of Service | Switch Theme",
    description: "Read the Terms of Service for Switch Theme. Understand your rights and responsibilities when using our platform for Nintendo 3DS/2DS theme sharing.",
    url: "https://switchthemes.vercel.app/terms-of-service",
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
    title: "Terms of Service | Switch Theme",
    description: "Read the Terms of Service for Switch Theme. Understand your rights and responsibilities when using our platform for Nintendo 3DS/2DS theme sharing.",
    images: ["/switch-theme-logo.svg"],
  },
};

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1E1E1E] rounded-lg p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-300">
              Last Modified: July 1, 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 mb-8">
              Switch Theme is a platform that hosts user-submitted themes for the Nintendo Switch system. 
              By using our services, you agree to comply with and be bound by the following terms. 
              These terms are subject to change at any time without prior notice.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">1. Ownership</h2>
              <p className="text-gray-300 mb-4">
                Files uploaded to Switch Theme remain the property of their original uploader. 
                Once uploaded, files will be hosted on our servers and remain under the responsibility 
                and care of the uploader. Users are fully accountable for the content they submit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">2. Copyright</h2>
              <p className="text-gray-300 mb-4">
                All uploads must comply with applicable copyright laws. By uploading content to Switch Theme, 
                you confirm that:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                <li>You are the rightful owner or have permission to share the content.</li>
                <li>The content is purely fan-made and not created by Nintendo or its partners.</li>
              </ul>
              <p className="text-gray-300 mb-4">
                If you believe any content on Switch Theme infringes your copyright, and you are the copyright 
                owner or an authorized agent, please contact us for takedown requests at:
              </p>
              <p className="text-gray-300 font-medium">
                Email: abuse@switchtheme.app (or your actual email)
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">3. NSFW Content</h2>
              <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                <li>NSFW content must be clearly marked using the provided NSFW checkbox.</li>
                <li>Content that depicts or implies sexual arousal is considered NSFW.</li>
                <li>Nudity (real or animated) is allowed, but explicit sex acts (pornographic content) are strictly prohibited.</li>
                <li>Absolutely no content involving individuals under 18, whether real or fictional. This includes any &apos;Lolita&apos; or similar material, even if age disclaimers are present.</li>
              </ul>
              <p className="text-gray-300">
                Violation of these rules will result in immediate account suspension or termination.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">4. Abuse & Exploits</h2>
              <p className="text-gray-300 mb-4">We do not tolerate:</p>
              <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                <li>Exploiting the platform</li>
                <li>Spamming</li>
                <li>Uploading harmful or malicious files</li>
                <li>Any actions that damage the site or user experience</li>
              </ul>
              <p className="text-gray-300 mb-4">
                If you discover any bugs or security vulnerabilities, report them immediately via our 
                <a href="/contact-us" className="text-emerald-400 hover:text-emerald-300 mx-1">Contact Page</a> 
                or GitHub repository.
              </p>
              <p className="text-gray-300">
                Any misuse of the service may result in instant termination of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">5. Account Termination</h2>
              <p className="text-gray-300">
                Switch Theme reserves the right to suspend or permanently terminate any user&apos;s account 
                at any time and without explanation, particularly in the event of rule violations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">6. Amendments</h2>
              <p className="text-gray-300">
                Switch Theme may update or amend these Terms of Service at any time. We also reserve 
                the right to take action against users or content at our discretion, even if such actions 
                are not explicitly covered in these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">7. Contact</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions, need help, or wish to report an issue, please reach out through:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                <li><a href="/contact-us" className="text-emerald-400 hover:text-emerald-300">Contact Page</a></li>
                <li>GitHub Repository (if public)</li>
                <li>Email: support@switchtheme.app (or your actual contact email)</li>
              </ul>
            </section>

            <div className="border-t border-gray-700 pt-8 mt-8">
              <p className="text-gray-300 text-center">
                By using Switch Theme, you acknowledge and agree to these terms. 
                Thank you for helping us keep the community creative, respectful, and safe.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/faq"
                className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                FAQ
              </a>
              <a
                href="/privacy-policy"
                className="inline-flex items-center px-8 py-4 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage; 