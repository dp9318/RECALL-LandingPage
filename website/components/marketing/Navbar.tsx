"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-recall-blue-muted/15 bg-recall-ink/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-recall-amber/40 flex items-center justify-center shadow-md group-hover:border-recall-amber transition-colors bg-recall-ink">
            <Image
              src="/RECALL-logo-1.svg"
              alt="RECALL logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-lg text-white font-mono group-hover:text-recall-amber transition-colors">
              RECALL
            </span>
            <span className="text-[10px] tracking-wider uppercase font-mono text-recall-blue-muted">
              Agent Memory
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-recall-cream/80">
          <a
            href="#features"
            className="hover:text-recall-amber transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-recall-amber transition-colors"
          >
            How it works
          </a>
          <a
            href="#privacy"
            className="hover:text-recall-amber transition-colors"
          >
            Privacy
          </a>
          <a
            href="https://github.com/dp9318/RECALL"
            target="_blank"
            rel="noreferrer"
            className="hover:text-recall-amber transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </a>
        </nav>

        {/* Action button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login?returnTo=/download">
            <Button className="bg-recall-amber hover:bg-recall-amber-hover text-recall-ink font-semibold h-10 px-5 rounded-control shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
              Sign in to download
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-recall-cream hover:bg-recall-deep-blue/40 border border-recall-blue-muted/20"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-recall-blue-muted/20 bg-recall-ink/95 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-recall-cream hover:bg-recall-deep-blue/50"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-recall-cream hover:bg-recall-deep-blue/50"
          >
            How it works
          </a>
          <a
            href="#privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-recall-cream hover:bg-recall-deep-blue/50"
          >
            Privacy
          </a>
          <a
            href="https://github.com/dp9318/RECALL"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-recall-cream hover:bg-recall-deep-blue/50"
          >
            <GithubIcon className="w-4 h-4" />
            GitHub Repository
          </a>
          <div className="pt-2">
            <Link href="/login?returnTo=/download" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-recall-amber hover:bg-recall-amber-hover text-recall-ink font-semibold h-11 rounded-control flex items-center justify-center gap-2">
                Sign in to download
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
