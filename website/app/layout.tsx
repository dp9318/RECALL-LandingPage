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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RECALL — Persistent Memory for AI Coding Agents",
    template: "%s | RECALL",
  },
  description:
    "Carry project decisions, custom instructions, and relevant context across AI coding sessions with RECALL, a local-first memory engine for coding agents.",
  keywords: [
    "AI coding agent",
    "persistent memory",
    "MCP",
    "Model Context Protocol",
    "developer tools",
    "local-first",
    "context engine",
  ],
  authors: [{ name: "RECALL Team" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RECALL — Persistent Memory for AI Coding Agents",
    description:
      "Carry project decisions, custom instructions, and relevant context across AI coding sessions with RECALL, a local-first memory engine for coding agents.",
    url: "/",
    siteName: "RECALL",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "RECALL — Persistent Memory for AI Coding Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RECALL — Persistent Memory for AI Coding Agents",
    description:
      "Carry project decisions, custom instructions, and relevant context across AI coding sessions with RECALL, a local-first memory engine for coding agents.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RECALL",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows 10, Windows 11 (64-bit)",
  description:
    "A local-first persistent memory engine and custom instruction enforcement layer for AI coding agents.",
  license: "https://github.com/dp9318/RECALL/blob/main/LICENSE",
  url: "https://github.com/dp9318/RECALL",
  softwareRequirements: "Python 3.11 or 3.12 in PATH",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-recall-ink text-recall-cream antialiased selection:bg-recall-amber/30 selection:text-white flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-recall-amber focus:text-recall-ink focus:font-semibold focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
