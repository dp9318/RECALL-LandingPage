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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
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
  openGraph: {
    title: "RECALL — Persistent Memory for AI Coding Agents",
    description:
      "Carry project decisions, custom instructions, and relevant context across AI coding sessions with RECALL, a local-first memory engine for coding agents.",
    url: "/",
    siteName: "RECALL",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RECALL — Persistent Memory for AI Coding Agents",
    description:
      "Carry project decisions, custom instructions, and relevant context across AI coding sessions with RECALL, a local-first memory engine for coding agents.",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
      <body className="min-h-screen bg-recall-ink text-recall-cream antialiased selection:bg-recall-amber/30 selection:text-white flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
