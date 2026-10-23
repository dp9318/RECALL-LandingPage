import { Database, GitBranch, Layers, ShieldCheck, Terminal } from "lucide-react";

export function ProductVisual() {
  return (
    <div className="w-full relative rounded-card overflow-hidden border border-recall-blue-muted/25 bg-gradient-to-b from-recall-deep-blue/40 to-recall-ink/90 p-5 sm:p-7 shadow-2xl backdrop-blur-md">
      {/* Visual Header / Terminal bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-recall-blue-muted/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 font-mono text-xs text-recall-blue-muted font-medium">
            recall-daemon · mcp v1.2 · local-first
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-recall-amber/15 text-recall-amber border border-recall-amber/30">
            <span className="w-1.5 h-1.5 rounded-full bg-recall-amber animate-pulse" />
            Lineage Synced
          </span>
        </div>
      </div>

      {/* Interactive Mock Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs font-mono">
        {/* Left column: Context Ingestion & Active Rules */}
        <div className="lg:col-span-5 space-y-3">
          <div className="rounded-xl bg-recall-ink/80 border border-recall-blue-muted/20 p-4">
            <div className="flex items-center justify-between text-recall-blue-muted mb-2 font-semibold">
              <span className="flex items-center gap-1.5 text-recall-cream">
                <Layers className="w-3.5 h-3.5 text-recall-amber" />
                Active Custom Instructions
              </span>
              <span className="text-[10px] text-recall-amber">PRIORITY 1</span>
            </div>
            <div className="space-y-1.5 text-recall-cream/90 text-[11px]">
              <div className="p-2 rounded bg-recall-deep-blue/40 border border-recall-blue-muted/15">
                <span className="text-recall-amber">rule_01:</span> Preserve SQLite as canonical persistence.
              </div>
              <div className="p-2 rounded bg-recall-deep-blue/40 border border-recall-blue-muted/15">
                <span className="text-recall-amber">rule_02:</span> ChromaDB index is derived &amp; rebuildable.
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-recall-ink/80 border border-recall-blue-muted/20 p-4">
            <div className="flex items-center justify-between text-recall-blue-muted mb-2 font-semibold">
              <span className="flex items-center gap-1.5 text-recall-cream">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                Canonical SQLite Memory Store
              </span>
              <span className="text-[10px] text-emerald-400">LOCAL</span>
            </div>
            <div className="space-y-1 text-recall-blue-muted text-[11px]">
              <div className="flex justify-between py-1 border-b border-recall-blue-muted/10">
                <span>mem_98a2 (arch-decisions)</span>
                <span className="text-emerald-400">RESOLVED</span>
              </div>
              <div className="flex justify-between py-1 border-b border-recall-blue-muted/10">
                <span>mem_98b4 (auth-spec)</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
              <div className="flex justify-between py-1">
                <span>mem_98c1 (design-tokens)</span>
                <span className="text-recall-amber font-semibold">SUPERSEDED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Context Assembly & Agent Return */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-recall-deep-blue/30 border border-recall-blue-muted/25 p-4 sm:p-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-recall-amber" />
                Agent Context Assembly
              </span>
              <span className="text-[10px] text-recall-blue-muted font-mono">
                latency: 12ms · zero cloud leaks
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-recall-ink/90 border border-recall-blue-muted/30 text-[11px] space-y-2 text-recall-cream">
              <p className="text-recall-blue-muted">
                {"// Synthesizing cross-session memory for agent query:"}
              </p>
              <p className="text-emerald-400 font-semibold">
                &gt; recall.get_context(query=&quot;authentication and storage gate&quot;)
              </p>
              <div className="pl-3 border-l-2 border-recall-amber space-y-1.5 my-2">
                <p className="text-white">
                  [1] Official Windows release is protected via private Supabase Storage signed URLs.
                </p>
                <p className="text-white">
                  [2] Upstash throttles download URL requests: 10/10m user, 30/10m IP backstop.
                </p>
                <p className="text-recall-amber">
                  [3] Conflict resolved: Local SQLite is primary authority; local memories never upload to marketing database.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-recall-blue-muted/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-recall-blue-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Local-first privacy intact
            </span>
            <span className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-recall-amber" />
              Lineage depth: 4 revisions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
