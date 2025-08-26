import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resepi Khairul Aming",
  description: "Koleksi resepi masakan Malaysia dari Khairul Aming",
  other: {
    "apple-mobile-web-app-title": "Resepi KA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2025 Resepi Khairulaming. Hak Cipta Terpelihara.</p>
            </div>
          </div>
        </footer>
        <Analytics />
        
        {/* Fixed credit at bottom right */}
        <div className="fixed bottom-4 right-4 z-50">
          <a 
            href="https://danishaiman.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-900 text-white text-xs px-3 py-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200 flex items-center gap-1"
          >
            <span>Created by</span>
            <span className="font-medium">@danishayman</span>
          </a>
        </div>
      </body>
    </html>
  );
}
