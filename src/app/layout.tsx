import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { absoluteUrl } from "@/lib/utils";
import { FirstVisitLoader } from "@/components/public/first-visit-loader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kavinhq.com"),
  title: {
    default: "Kavin HQ | Mission Control for Digital Systems",
    template: "%s | Kavin HQ"
  },
  description: "Kavin HQ is the home base for software work, case studies, technical notes, and business-focused web solutions.",
  openGraph: {
    title: "Kavin HQ",
    description: "Mission Control for Digital Systems",
    url: absoluteUrl("/"),
    siteName: "Kavin HQ",
    type: "website"
  },
  twitter: { card: "summary_large_image", title: "Kavin HQ", description: "Mission Control for Digital Systems" },
  alternates: { canonical: absoluteUrl("/") }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable}`}>
        <FirstVisitLoader />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
