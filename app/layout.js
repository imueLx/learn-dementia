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

export const metadata = {
  title: "Dementia Awareness",
  description: "Explore dementia information, symptoms, and screenings.",
  author: "uel",
  keywords: "dementia, health, awareness, symptoms, screenings",
  charset: "UTF-8",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#ffffff",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet={metadata.charset} />
        <meta name="viewport" content={metadata.viewport} />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.author} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="theme-color" content={metadata.themeColor} />
        <meta name="robots" content={metadata.robots} />
        <link rel="icon" href="/favicon.ico" />
        {/* Import fonts using the font loader */}
        <style>{geistSans.styles}</style>
        <style>{geistMono.styles}</style>
      </head>
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
