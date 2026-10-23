import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, HardDrive, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Button } from "@/components/ui/button";
import { getActiveRelease } from "@/lib/releases";

export function DownloadCta() {
  const release = getActiveRelease();

  return (
    <section id="download" className="py-24 relative overflow-hidden bg-gradient-to-b from-recall-ink to-recall-deep-blue/40 border-t border-recall-blue-muted/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-recall-amber/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-recall-deep-blue/60 border border-recall-amber/30 text-xs font-mono text-recall-amber mb-6">
          <Download className="w-3.5 h-3.5" />
          <span>Official Distribution · v{release.version} · Gated Release</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
          Bring continuity to your coding sessions.
        </h2>

        <p className="text-base sm:text-xl text-recall-blue-muted max-w-2xl mx-auto leading-relaxed mb-10">
          Access to the official Windows portable release requires an authenticated session. Binary distribution is gated via server authorization; manual build and installation instructions remain available on GitHub while private storage delivery is finalized.
        </p>

        {/* Requirements Box */}
        <div className="max-w-xl mx-auto mb-10 p-5 rounded-2xl bg-recall-ink/80 border border-recall-blue-muted/25 text-left text-xs font-mono space-y-2.5">
          <div className="flex items-center justify-between text-recall-cream font-semibold pb-2 border-b border-recall-blue-muted/15">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-recall-amber" />
              System Requirements
            </span>
            <span className="text-recall-amber font-mono text-[11px]">{release.targetPlatform}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-recall-blue-muted">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Windows 10 (19041+) / Windows 11</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{release.pythonRequirements}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-recall-blue-muted/15 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-recall-blue-muted">
            <span>Gate Policy:</span>
            <span className="text-recall-amber">Authenticated server session required</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login?returnTo=/download">
            <Button className="w-full sm:w-auto bg-recall-amber hover:bg-recall-amber-hover text-recall-ink font-semibold h-13 px-9 rounded-control text-base shadow-2xl flex items-center justify-center gap-2 transition-transform active:scale-95">
              Sign in to download
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <a
            href={release.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              className="w-full sm:w-auto border-recall-blue-muted/30 bg-recall-deep-blue/20 hover:bg-recall-deep-blue/40 text-recall-cream h-13 px-8 rounded-control text-base flex items-center justify-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              Explore on GitHub
            </Button>
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-recall-blue-muted font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Local-first architecture. Public source code remains open under the MIT License.</span>
        </div>
      </div>
    </section>
  );
}
