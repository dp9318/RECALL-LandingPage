import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Sign In — RECALL",
  description: "Sign in with GitHub to access official RECALL binary releases.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-recall-ink text-recall-cream flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-recall-deep-blue/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-recall-deep-blue/50 border border-recall-blue-muted/20 backdrop-blur-md rounded-card p-8 shadow-2xl relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-recall-blue-muted hover:text-recall-cream transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-recall-amber animate-pulse" />
          <span className="text-xs uppercase tracking-wider font-mono text-recall-amber">
            Official Distribution
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-2 text-white">
          Sign in to RECALL
        </h1>
        <p className="text-sm text-recall-blue-muted mb-6">
          Access the official Windows portable release and update channel.
        </p>

        <div className="space-y-4">
          <Button
            className="w-full bg-recall-amber hover:bg-recall-amber-hover text-recall-ink font-semibold h-11 rounded-control flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
            disabled
          >
            <GithubIcon className="w-5 h-5" />
            Sign in with GitHub
          </Button>

          <div className="p-3.5 rounded-lg bg-recall-ink/60 border border-recall-blue-muted/20 text-xs text-recall-blue-muted flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-recall-amber shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-recall-cream">Provider Configuration Required</p>
              <p className="mt-0.5">
                GitHub OAuth credentials and Supabase Auth are currently being wired by Shiva in the auth feature branch. Mock credentials are not permitted.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-recall-blue-muted/15 text-center text-xs text-recall-blue-muted">
          <span>Source code remains public under the </span>
          <a
            href="https://github.com/dp9318/RECALL"
            target="_blank"
            rel="noreferrer"
            className="text-recall-amber hover:underline"
          >
            MIT License on GitHub
          </a>
          .
        </div>
      </div>
    </main>
  );
}
