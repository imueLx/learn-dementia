// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Export metadata with Open Graph and Twitter Card
export const metadata = {
  title: "Dementia Awareness",
  description: "Explore dementia information, symptoms, and screenings.",
  authors: [{ name: "uel" }],
  keywords: ["dementia", "health", "awareness", "symptoms", "screenings"],
  viewport: {
    width: "device-width",
    initialScale: 1.0,
  },
  themeColor: "#ffffff",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Dementia Awareness",
    description: "Explore dementia information, symptoms, and screenings.",
    url: "https://learn-dementia.vercel.app/",
    siteName: "Dementia Awareness",
    images: [
      {
        url: "/sample_pictures/dementia-awareness.jpg",
        width: 1200,
        height: 630,
        alt: "Dementia Awareness Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dementia Awareness",
    description: "Explore dementia information, symptoms, and screenings.",
    images: [
      "https://learn-dementia.vercel.app//sample_pictures/dementia-awareness.jpg",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
