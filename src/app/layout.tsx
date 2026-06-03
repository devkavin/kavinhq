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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kavinhq.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kavin HQ — Mission Control for Digital Systems",
    template: "%s | Kavin HQ",
  },
  description: "Kavin HQ is the home base for my software work, case studies, technical notes, and business-focused web solutions.",
  keywords: [
    "Kavin",
    "Kavindra",
    "Kavin HQ",
    "Software Engineer",
    "Web Developer",
    "Laravel Developer",
    "ASP.NET Core",
    "React",
    "Next.js",
    "Systems Architect"
  ],
  authors: [{ name: "Kavindra Senanayake" }],
  creator: "Kavindra Senanayake",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Kavin HQ — Mission Control for Digital Systems",
    description: "Personal headquarters for Kavindra's engineering work, case studies, technical notes, and business-focused web solutions.",
    siteName: "Kavin HQ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kavin HQ — Mission Control for Digital Systems",
    description: "Personal headquarters for Kavindra's engineering work, case studies, technical notes, and business-focused web solutions.",
    creator: "@kavinhq",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0F172A] text-[#E5E7EB]">
        {children}
      </body>
    </html>
  );
}

