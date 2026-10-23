import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { GithubLoginButton } from "@/components/auth/GithubLoginButton";
import { validateReturnPath } from "@/lib/security/redirect";

export const metadata = {
  title: "Sign In — RECALL",
  description: "Sign in with GitHub to access official RECALL binary releases.",
  robots: {
    index: false,
    follow: false,
  },
};

interface LoginPageProps {
  searchParams?: Promise<{
    returnTo?: string;
    next?: string;
    error?: string;
  }>;
}

async function LoginCard({ searchParams }: LoginPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const rawReturnTo = resolvedParams.returnTo || resolvedParams.next;
  const safeReturnTo = validateReturnPath(rawReturnTo, "/download");
  const authError = resolvedParams.error;

  return (
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

      {authError && (
        <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-500/30 text-xs text-red-200 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          <span>
            Authentication failed. Please verify GitHub authorization or retry.
          </span>
        </div>
      )}

      <div className="space-y-4">
        <GithubLoginButton returnTo={safeReturnTo} />

        <div className="p-3.5 rounded-lg bg-recall-ink/60 border border-recall-blue-muted/20 text-xs text-recall-blue-muted flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-recall-amber shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-recall-cream">Secure Server-Side Gate</p>
            <p className="mt-0.5">
              Authentication grants an authorized session for downloading the official portable binary. Your local memories remain 100% on your machine.
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
  );
}

export default function LoginPage(props: LoginPageProps) {
  return (
    <main className="min-h-screen bg-recall-ink text-recall-cream flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-recall-deep-blue/40 rounded-full blur-3xl pointer-events-none" />

      <Suspense
        fallback={
          <div className="w-full max-w-md bg-recall-deep-blue/50 border border-recall-blue-muted/20 rounded-card p-8 animate-pulse text-center text-recall-blue-muted text-sm">
            Loading sign in...
          </div>
        }
      >
        <LoginCard {...props} />
      </Suspense>
    </main>
  );
}
