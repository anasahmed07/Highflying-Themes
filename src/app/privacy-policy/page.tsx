import React from 'react';
import type { Metadata } from "next";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1E1E1E] rounded-lg p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Privacy Policy
            </h1>
            <div className="text-gray-300 space-y-1">
              <p>Effective Date: July 1, 2025</p>
              <p>Last Modified: July 1, 2025</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 mb-8">
              Welcome to Switch Theme (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;). This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website, interact with 
              our services, and upload content.
            </p>

            <p className="text-gray-300 mb-8">
              This policy applies only to our online activities and is valid for visitors to our website 
              regarding the information they share and/or that we collect. It does not apply to any offline 
              or third-party activities not operated by Switch Theme.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">1. Consent</h2>
              <p className="text-gray-300">
                By using Switch Theme, you consent to this Privacy Policy and agree to its terms. 
                If you do not agree, please refrain from using our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">2. Information We Collect</h2>
              <p className="text-gray-300 mb-4">
                We strive to collect the minimum amount of personal data necessary for delivering our services.
              </p>

              <h3 className="text-xl font-light text-white mb-3">2.1 Information You Provide</h3>
              <p className="text-gray-300 mb-3 font-medium">Authentication Data:</p>
              <p className="text-gray-300 mb-4">
                When you log in using third-party services (e.g., Discord, Google), we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                <li>Your display name</li>
                <li>Unique user ID</li>
                <li>Profile picture URL</li>
                <li>Email address (if provided by OAuth scope)</li>
              </ul>

              <p className="text-gray-300 mb-3 font-medium">User-Submitted Content:</p>
              <p className="text-gray-300 mb-4">
                When you upload a theme, we collect metadata such as:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                <li>Theme title and description</li>
                <li>Upload date and time</li>
                <li>Tags and category</li>
                <li>Associated preview images and files</li>
              </ul>

              <p className="text-gray-300 mb-3 font-medium">Contact Form Data:</p>
              <p className="text-gray-300 mb-4">
                If you reach out to us, we may collect your name, email, and any additional information 
                you voluntarily submit.
              </p>

              <h3 className="text-xl font-light text-white mb-3">2.2 Information We Automatically Collect</h3>
              <p className="text-gray-300 mb-3 font-medium">Device & Log Information:</p>
              <p className="text-gray-300 mb-4">
                We may collect information such as:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
                <li>Referrer URLs</li>
              </ul>

              <p className="text-gray-300 mb-3 font-medium">Cookies and Local Storage:</p>
              <p className="text-gray-300 mb-4">
                Like most websites, we use cookies and similar technologies to enhance user experience. These may store:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                <li>Session data</li>
                <li>Preferences</li>
                <li>Analytics identifiers</li>
              </ul>
              <p className="text-gray-300">
                You may control or disable cookies via your browser settings, but some features may not function properly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">3. Use of Information</h2>
              <p className="text-gray-300 mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>To authenticate and identify users</li>
                <li>To allow theme uploading, browsing, filtering, and downloading</li>
                <li>To monitor and improve site performance</li>
                <li>To personalize user experience</li>
                <li>To respond to inquiries or support requests</li>
                <li>To detect and prevent abuse, fraud, and security threats</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">4. Third-Party Services</h2>
              <p className="text-gray-300 mb-4">
                We rely on reputable third-party services to help operate and enhance our platform. These include:
              </p>

              <h3 className="text-xl font-light text-white mb-3">4.1 Authentication Providers</h3>
              <p className="text-gray-300 mb-4">
                <strong>Discord Inc. / Google Inc.</strong><br />
                Used for secure OAuth2 login. We store your Discord/Google ID and public profile information for account linking.
              </p>

              <h3 className="text-xl font-light text-white mb-3">4.2 Infrastructure & Performance</h3>
              <p className="text-gray-300 mb-4">
                <strong>Cloudflare, Inc.</strong><br />
                Provides CDN, DDoS protection, and performance optimization. We do not store Cloudflare-collected visitor data on our servers.
              </p>

              <h3 className="text-xl font-light text-white mb-3">4.3 Analytics</h3>
              <p className="text-gray-300">
                <strong>Google Analytics</strong><br />
                Used to collect anonymized statistics such as page views, session duration, and region. 
                This helps us understand how users engage with the platform. For full details, please review the Google Analytics Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">5. Sharing and Disclosure of Information</h2>
              <p className="text-gray-300 mb-4">
                We do not sell your personal data. We may share your information in the following limited scenarios:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>With your consent</li>
                <li>To service providers strictly for the purpose of providing functionality to the site (e.g., analytics, hosting)</li>
                <li>To comply with legal requirements or lawful government requests</li>
                <li>To enforce our Terms of Service</li>
                <li>To investigate or prevent abuse or harm</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">6. Data Security</h2>
              <p className="text-gray-300">
                We take data protection seriously and implement appropriate technical and organizational 
                measures to safeguard your information. However, no system is entirely secure, and we 
                cannot guarantee absolute protection.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">7. Your Rights</h2>
              <p className="text-gray-300 mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Object to data processing in certain cases</li>
                <li>Lodge a complaint with a data protection authority</li>
              </ul>
              <p className="text-gray-300">
                To exercise these rights, please contact us using the details below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">8. Data Retention</h2>
              <p className="text-gray-300">
                We retain personal data only as long as necessary for the purposes outlined in this policy, 
                unless a longer retention period is required by law or for legitimate interests 
                (e.g., abuse prevention, legal defense).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-gray-300">
                Our platform is not intended for users under the age of 13. We do not knowingly collect 
                data from children. If we become aware of any such data, we will take steps to remove it immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">10. External Links</h2>
              <p className="text-gray-300">
                Our website may contain links to third-party websites. We are not responsible for the 
                privacy practices or content of those sites. Please review their policies independently.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">11. Policy Changes</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. The &quot;Last Modified&quot; date at the top 
                of this page indicates when it was last updated. Changes will take effect immediately 
                upon posting on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-white mb-4">12. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                For questions, concerns, or data-related requests, you can reach us at:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Contact Page: <a href="/contact-us" className="text-emerald-400 hover:text-emerald-300">Switch Theme Contact</a></li>
                <li>Email: privacy@switchtheme.app (replace with your actual email)</li>
              </ul>
            </section>

            <div className="border-t border-gray-700 pt-8 mt-8">
              <p className="text-gray-300 text-center">
                Thank you for using Switch Theme. We&apos;re committed to keeping your data safe and your experience enjoyable.
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
                href="/terms-of-service"
                className="inline-flex items-center px-8 py-4 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

export const metadata: Metadata = {
  title: "Privacy Policy | Switch Theme",
  description: "Read the Privacy Policy for Switch Theme. Learn how we collect, use, and protect your data when you use our platform to upload, share, and download Nintendo 3DS/2DS themes.",
  openGraph: {
    title: "Privacy Policy | Switch Theme",
    description: "Read the Privacy Policy for Switch Theme. Learn how we collect, use, and protect your data when you use our platform to upload, share, and download Nintendo 3DS/2DS themes.",
    url: "https://switchthemes.vercel.app/privacy-policy",
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
    title: "Privacy Policy | Switch Theme",
    description: "Read the Privacy Policy for Switch Theme. Learn how we collect, use, and protect your data when you use our platform to upload, share, and download Nintendo 3DS/2DS themes.",
    images: ["/switch-theme-logo.svg"],
  },
}; 