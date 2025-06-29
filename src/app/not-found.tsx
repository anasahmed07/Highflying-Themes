import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "404 | Page Not Found | Highflying Themes",
    description: "The page you're looking for doesn't exist",
  };
  

export default function RootNotFound(){
    return(
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
                <div className="mb-8">
                    <h1 className="text-8xl font-light text-white mb-4">404</h1>
                    <h2 className="text-2xl font-light text-white mb-4">Page Not Found</h2>
                    <p className="text-gray-300 leading-relaxed">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved. 
                        Let&apos;s get you back to exploring themes.
                    </p>
                </div>
                
                <div className="space-y-4">
                    <Link href="/">
                        <button className="w-full px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium">
                            Go Home
                        </button>
                    </Link>
                    
                    <Link href="/themes">
                        <button className="w-full px-8 py-4 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors duration-200 font-medium">
                            Browse Themes
                        </button>
                    </Link>
                </div>
                
                <div className="mt-12 text-sm text-gray-400">
                    <p>If you believe this is an error, please</p>
                    <Link href="/contact-us" className="text-emerald-400 hover:text-emerald-300">
                        contact our support team
                    </Link>
                </div>
            </div>
        </div>
   
    )
}