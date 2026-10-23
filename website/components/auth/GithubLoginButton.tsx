"use client";

import { useTransition } from "react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface GithubLoginButtonProps {
  returnTo?: string;
}

export function GithubLoginButton({ returnTo = "/download" }: GithubLoginButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(async () => {
      const supabase = createClient();
      if (!supabase) {
        alert("Supabase authentication is not configured. Please check your environment variables.");
        return;
      }

      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(returnTo)}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo,
        },
      });

      if (error) {
        console.error("[Login] OAuth Error:", error.message);
        alert(`Authentication error: ${error.message}`);
      }
    });
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={isPending}
      className="w-full bg-recall-amber hover:bg-recall-amber-hover text-recall-ink font-semibold h-11 rounded-control flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer disabled:opacity-60"
    >
      <GithubIcon className="w-5 h-5" />
      {isPending ? "Connecting to GitHub..." : "Sign in with GitHub"}
    </Button>
  );
}
