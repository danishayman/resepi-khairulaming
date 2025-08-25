import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      </body>
    </html>
  );
}
