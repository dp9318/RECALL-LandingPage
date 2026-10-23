import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getActiveRelease } from "@/lib/releases";

export const metadata = {
  title: "Download RECALL — Official Windows Distribution",
  description: "Official portable release distribution for RECALL.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DownloadPage() {
  const release = getActiveRelease();

  return (
    <main className="min-h-screen bg-recall-ink text-recall-cream flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-recall-deep-blue/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg bg-recall-deep-blue/50 border border-recall-blue-muted/20 backdrop-blur-md rounded-card p-8 shadow-2xl relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-recall-blue-muted hover:text-recall-cream transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-recall-amber" />
            <span className="text-xs uppercase tracking-wider font-mono text-recall-amber font-semibold">
              v{release.version} Available
            </span>
          </div>
          <span className="text-xs font-mono text-recall-blue-muted px-2.5 py-1 rounded-full bg-recall-ink/60 border border-recall-blue-muted/20">
            {release.targetPlatform}
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-2 text-white">
          Download RECALL
        </h1>
        <p className="text-sm text-recall-blue-muted mb-6">
          Official Windows release distribution for persistent coding agent memory.
        </p>

        {/* System requirements */}
        <div className="p-4 rounded-xl bg-recall-ink/70 border border-recall-blue-muted/20 mb-6 space-y-2.5 text-xs">
          <div className="font-semibold text-recall-cream flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-recall-amber" />
            System Requirements
          </div>
          <ul className="space-y-1 text-recall-blue-muted pl-5 list-disc">
            {release.osRequirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
            <li>{release.pythonRequirements}</li>
          </ul>
        </div>

        {/* Download action calling protected route */}
        <div className="space-y-3">
          <a href="/api/download" className="block w-full">
            <Button className="w-full bg-recall-amber hover:bg-recall-amber-hover text-recall-ink font-semibold h-12 rounded-control flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 text-sm">
              <Download className="w-4 h-4" />
              Download {release.downloadFilename}
            </Button>
          </a>
          <p className="text-[11px] text-center text-recall-blue-muted">
            Protected endpoint verifies active session and issues a short-lived signed URL.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-recall-blue-muted/15 flex items-center justify-between text-xs text-recall-blue-muted">
          <a
            href={release.documentationUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-recall-cream inline-flex items-center gap-1"
          >
            Setup Guide <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={release.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-recall-cream inline-flex items-center gap-1"
          >
            GitHub Repository <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </main>
  );
}
