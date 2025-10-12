import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import DarkModeToggle from '@/components/DarkModeToggle';
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
  description: "Koleksi resepi masakan dari Khairul Aming",
  openGraph: {
    title: "Resepi Khairul Aming",
    description: "Koleksi resepi masakan dari Khairul Aming",
    url: "https://www.resepika.my",
    siteName: "Resepi Khairul Aming",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Resepi Khairul Aming",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resepi Khairul Aming",
    description: "Koleksi resepi masakan Malaysia dari Khairul Aming",
    images: ["/preview.png"],
  },
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
    <html lang="ms" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider>
          <main className="min-h-screen relative">
            {/* Dark mode toggle at top right of content */}
            <div className="absolute top-4 right-4 z-50">
              <DarkModeToggle />
            </div>
            {children}
          </main>
          <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">

          </footer>
          <Analytics />

          {/* Fixed credit at bottom right */}
          <div className="fixed bottom-2 right-6 z-50">
            <a 
              href="https://danishaiman.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-900 dark:bg-white text-white dark:text-black text-xs px-3 py-2 rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 flex items-center gap-1"
            >
              <span>Created by</span>
              <span className="font-medium underline">@danishayman</span>
            </a>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
