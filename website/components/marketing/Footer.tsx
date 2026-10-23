import { ExternalLink } from "lucide-react";
import { getActiveRelease } from "@/lib/releases";

export function Footer() {
  const release = getActiveRelease();

  return (
    <footer className="border-t border-recall-blue-muted/15 bg-recall-ink py-12 text-xs text-recall-blue-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-white text-base">RECALL</span>
              <span className="text-[11px] font-mono text-recall-amber px-2 py-0.5 rounded bg-recall-amber/10 border border-recall-amber/20">
                v{release.version}
              </span>
            </div>
            <p className="max-w-xs text-recall-blue-muted leading-relaxed">
              Persistent cross-session memory engine for AI coding agents. Local-first architecture powered by SQLite, ChromaDB, and the Model Context Protocol.
            </p>
          </div>

          {/* Product navigation */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-sm font-mono">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-recall-cream transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-recall-cream transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-recall-cream transition-colors">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-recall-cream transition-colors">
                  Privacy Invariant
                </a>
              </li>
              <li>
                <a href="#download" className="hover:text-recall-cream transition-colors">
                  Windows Distribution
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-sm font-mono">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/dp9318/RECALL"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-recall-cream flex items-center gap-1"
                >
                  GitHub Repository <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dp9318/RECALL#readme"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-recall-cream flex items-center gap-1"
                >
                  Documentation <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dp9318/RECALL/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-recall-cream flex items-center gap-1"
                >
                  MIT License <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  className="hover:text-recall-cream flex items-center gap-1"
                >
                  llms.txt <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Contact */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-sm font-mono">Community</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/dp9318/RECALL/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-recall-cream flex items-center gap-1"
                >
                  GitHub Issues <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dp9318/RECALL/discussions"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-recall-cream flex items-center gap-1"
                >
                  Discussions <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-recall-blue-muted/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 RECALL. Released under the open-source MIT License.</p>
          <div className="flex items-center gap-6">
            <span>Local-First Persistent Memory</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
