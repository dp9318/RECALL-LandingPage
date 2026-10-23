import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "./ProductVisual";

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background ambient lighting matching the cinematic lodge reference */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-recall-deep-blue/45 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-44 right-10 w-[300px] h-[300px] bg-recall-amber/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-recall-deep-blue/60 border border-recall-amber/30 text-xs font-mono text-recall-amber shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>A persistent context engine for AI coding agents</span>
          </div>

          {/* Headline with oversized editorial typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Your AI agent forgets. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-recall-cream via-recall-cream to-recall-amber">
              RECALL doesn&apos;t.
            </span>
          </h1>

          {/* Subcopy */}
          <p className="text-lg sm:text-xl text-recall-blue-muted max-w-2xl mx-auto font-normal leading-relaxed">
            Keep project decisions, conventions, and explicit instructions available across coding sessions. RECALL retrieves relevant context, preserves memory lineage, and helps agents work with what your project has already established.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Link href="/login?returnTo=/download">
              <Button className="w-full sm:w-auto bg-recall-amber hover:bg-recall-amber-hover text-recall-ink font-semibold h-12 px-8 rounded-control shadow-xl text-base flex items-center justify-center gap-2 transition-transform active:scale-95">
                Sign in to download
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <a
              href="https://github.com/dp9318/RECALL"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto border-recall-blue-muted/30 bg-recall-deep-blue/20 hover:bg-recall-deep-blue/50 text-recall-cream h-12 px-7 rounded-control text-base flex items-center justify-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                Explore on GitHub
              </Button>
            </a>
          </div>

          {/* Trust Note */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-recall-blue-muted">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              Local-first by design. Your RECALL memory store stays on your machine.
            </span>
          </div>
        </div>

        {/* Cinematic Product Visual */}
        <div className="mt-14 sm:mt-20 max-w-5xl mx-auto">
          <ProductVisual />
        </div>
      </div>
    </section>
  );
}
