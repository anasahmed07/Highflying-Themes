'use client'
import ProtectedRoute from '@/components/ProtectedRoute';
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

function UploadThemeContent() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Share Your Theme
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Upload your custom Nintendo theme and share it with the community
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-[#1E1E1E] rounded-lg p-8">
              <h2 className="text-2xl font-light text-white mb-6">Theme Details</h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="themeName" className="block text-sm font-medium text-gray-300 mb-2">
                    Theme Name *
                  </label>
                  <input
                    type="text"
                    id="themeName"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Enter a descriptive name for your theme"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    placeholder="Describe your theme, its features, and any special notes..."
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="">Select category</option>
                      <option value="gaming">Gaming</option>
                      <option value="anime">Anime</option>
                      <option value="nature">Nature</option>
                      <option value="abstract">Abstract</option>
                      <option value="minimal">Minimal</option>
                      <option value="retro">Retro</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="compatibility" className="block text-sm font-medium text-gray-300 mb-2">
                      Compatibility *
                    </label>
                    <select
                      id="compatibility"
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="">Select system</option>
                      <option value="3ds">Nintendo 3DS</option>
                      <option value="2ds">Nintendo 2DS</option>
                      <option value="n3ds">New Nintendo 3DS</option>
                      <option value="n2ds">New Nintendo 2DS XL</option>
                      <option value="all">All Systems</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="themeFile" className="block text-sm font-medium text-gray-300 mb-2">
                    Theme File (.bctheme) *
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-gray-300 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-400">BCTHEME files only, max 10MB</p>
                    <input type="file" id="themeFile" className="hidden" accept=".bctheme" />
                  </div>
                </div>

                <div>
                  <label htmlFor="previewImage" className="block text-sm font-medium text-gray-300 mb-2">
                    Preview Image
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-gray-300 mb-2">Upload a preview image</p>
                    <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
                    <input type="file" id="previewImage" className="hidden" accept="image/*" />
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input type="checkbox" id="agree" className="mt-1 h-4 w-4 text-emerald-600 bg-[#0A0A0A] border-gray-600 rounded focus:ring-emerald-500" />
                  <label htmlFor="agree" className="text-sm text-gray-300">
                    I confirm that this theme is my original work or I have permission to share it, 
                    and it complies with our community guidelines.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Upload Theme
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h3 className="text-xl font-light text-white mb-4">Upload Guidelines</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Ensure your theme file is properly formatted (.bctheme)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Provide a clear, descriptive name and description</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Test your theme before uploading</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Include a preview image if possible</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Respect copyright and intellectual property</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h3 className="text-xl font-light text-white mb-4">File Requirements</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Theme File:</strong> .bctheme format, max 10MB</p>
                <p><strong>Preview Image:</strong> PNG/JPG, max 5MB</p>
                <p><strong>Compatibility:</strong> 3DS, 2DS, N3DS, N2DS</p>
              </div>
            </div>

            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h3 className="text-xl font-light text-white mb-4">Need Help?</h3>
              <p className="text-sm text-gray-300 mb-4">
                New to theme creation? Check out our guides and tutorials.
              </p>
              <button className="w-full px-4 py-2 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors duration-200 text-sm">
                View Tutorials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UploadThemePage() {
  return (
    <ProtectedRoute>
      <UploadThemeContent />
    </ProtectedRoute>
  );
}
  