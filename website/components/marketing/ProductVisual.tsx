"use client";

import { useState } from "react";
import { Database, GitBranch, Layers, ShieldCheck, Sparkles, Terminal } from "lucide-react";

export function ProductVisual() {
  const [activeTab, setActiveTab] = useState<"context" | "sqlite" | "rules">("context");

  return (
    <div className="w-full relative rounded-card overflow-hidden border border-recall-blue-muted/25 bg-gradient-to-b from-recall-deep-blue/40 to-recall-ink/90 p-5 sm:p-7 shadow-2xl backdrop-blur-md">
      {/* Visual Header / Terminal bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-recall-blue-muted/20 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 font-mono text-xs text-recall-blue-muted font-medium">
            Illustrative Architecture Spec · Local-First Pipeline Preview
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-recall-ink/70 border border-recall-blue-muted/20 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("context")}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === "context"
                ? "bg-recall-amber text-recall-ink font-semibold"
                : "text-recall-blue-muted hover:text-recall-cream"
            }`}
          >
            Context Assembly
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sqlite")}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === "sqlite"
                ? "bg-recall-amber text-recall-ink font-semibold"
                : "text-recall-blue-muted hover:text-recall-cream"
            }`}
          >
            SQLite Store
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("rules")}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === "rules"
                ? "bg-recall-amber text-recall-ink font-semibold"
                : "text-recall-blue-muted hover:text-recall-cream"
            }`}
          >
            Rules &amp; Precedence
          </button>
        </div>
      </div>

      {/* Main interactive visual body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs font-mono">
        {/* Left column: Storage Model & Invariant Specs */}
        <div className="lg:col-span-4 space-y-3">
          <div className="rounded-xl bg-recall-ink/80 border border-recall-blue-muted/20 p-4">
            <div className="flex items-center justify-between text-recall-blue-muted mb-2 font-semibold">
              <span className="flex items-center gap-1.5 text-recall-cream">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Data Model Invariant
              </span>
              <span className="text-[10px] text-recall-amber font-mono font-bold">SPECIFICATION</span>
            </div>
            <p className="text-[11px] text-recall-blue-muted leading-relaxed">
              Canonical store is retained locally. Zero memory database rows or project source code are uploaded to the marketing website.
            </p>
          </div>

          <div className="rounded-xl bg-recall-ink/80 border border-recall-blue-muted/20 p-4 space-y-2">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-recall-blue-muted">Canonical Store:</span>
              <span className="text-recall-cream font-bold">SQLite (Local Disk)</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-recall-blue-muted">Vector Index:</span>
              <span className="text-recall-cream font-bold">ChromaDB (Derived)</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-recall-blue-muted">Transport:</span>
              <span className="text-recall-cream font-bold">MCP (stdio / SSE)</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-recall-blue-muted">Precedence Hierarchy:</span>
              <span className="text-recall-amber font-bold">User &gt; Project &gt; Baseline</span>
            </div>
          </div>
        </div>

        {/* Right column: Dynamic Display according to activeTab */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-xl bg-recall-deep-blue/30 border border-recall-blue-muted/25 p-5">
          {activeTab === "context" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-recall-amber" />
                  Synthesized Agent Context
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  Tool: recall_get_context
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-recall-ink/90 border border-recall-blue-muted/30 text-[11px] space-y-2.5 text-recall-cream">
                <p className="text-recall-blue-muted">
                  {"// MCP query resolved with deterministic precedence & vector similarity:"}
                </p>
                <p className="text-emerald-400 font-semibold">
                  &gt; recall.get_context(query=&quot;official release download gating&quot;)
                </p>
                <div className="pl-3 border-l-2 border-recall-amber space-y-2 my-2 text-white">
                  <p>
                    <span className="text-recall-amber">[1]</span> Official Windows portable distribution is gated behind authenticated sessions in private Supabase Storage.
                  </p>
                  <p>
                    <span className="text-recall-amber">[2]</span> Throttling policy: 10 downloads/10m per user, with an IP backstop limit of 30 downloads/10m.
                  </p>
                  <p>
                    <span className="text-recall-amber">[3]</span> Precedence rule: Local SQLite memory store is canonical authority. No local memories uploaded to marketing site.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sqlite" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  SQLite Canonical Record Ledger
                </span>
                <span className="text-[10px] font-mono text-recall-blue-muted">
                  store: ~/.recall/canonical.db
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-recall-ink/90 border border-recall-blue-muted/30 text-[11px] space-y-2 text-recall-cream">
                <div className="grid grid-cols-12 text-recall-blue-muted pb-1 border-b border-recall-blue-muted/15 font-bold">
                  <span className="col-span-3">ID</span>
                  <span className="col-span-5">TOPIC</span>
                  <span className="col-span-4">STATE</span>
                </div>
                <div className="grid grid-cols-12 py-1 border-b border-recall-blue-muted/10">
                  <span className="col-span-3 font-mono text-recall-amber">#mem_98a2</span>
                  <span className="col-span-5">architecture-decisions</span>
                  <span className="col-span-4 text-emerald-400">RESOLVED</span>
                </div>
                <div className="grid grid-cols-12 py-1 border-b border-recall-blue-muted/10">
                  <span className="col-span-3 font-mono text-recall-amber">#mem_98b4</span>
                  <span className="col-span-5">auth-and-storage-spec</span>
                  <span className="col-span-4 text-emerald-400">ACTIVE</span>
                </div>
                <div className="grid grid-cols-12 py-1">
                  <span className="col-span-3 font-mono text-recall-blue-muted">#mem_97e0</span>
                  <span className="col-span-5 text-recall-blue-muted">design-tokens-v1</span>
                  <span className="col-span-4 text-recall-amber">SUPERSEDED (rev 2)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "rules" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-recall-amber" />
                  Custom Instruction Authority
                </span>
                <span className="text-[10px] font-mono text-recall-amber">
                  Deterministic Hierarchy
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-recall-ink/90 border border-recall-blue-muted/30 text-[11px] space-y-2 text-recall-cream">
                <div className="p-2 rounded bg-recall-deep-blue/40 border border-recall-blue-muted/20">
                  <div className="flex justify-between items-center text-recall-amber font-semibold mb-0.5">
                    <span>Priority 1: User Explicit Rules</span>
                    <span className="text-[10px]">GLOBAL</span>
                  </div>
                  <p className="text-white text-[11px]">
                    Preserve SQLite as canonical persistence. ChromaDB vector index is derived and rebuildable.
                  </p>
                </div>
                <div className="p-2 rounded bg-recall-deep-blue/40 border border-recall-blue-muted/20">
                  <div className="flex justify-between items-center text-recall-amber font-semibold mb-0.5">
                    <span>Priority 2: Project-Scoped Instructions</span>
                    <span className="text-[10px]">WORKSPACE</span>
                  </div>
                  <p className="text-white text-[11px]">
                    Downloads gate requires server-authorized signed URLs. Never expose service secrets to client bundles.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-recall-blue-muted/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-recall-blue-muted">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-recall-amber" />
              Hybrid retrieval: SQL + Embeddings
            </span>
            <span className="flex items-center gap-1.5 font-mono">
              <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
              Lineage provenance tracked
            </span>
          </div>
        </div>
      </div>

      {/* Illustrative Architecture Disclaimer */}
      <div className="mt-4 pt-3 border-t border-recall-blue-muted/15 text-center">
        <p className="text-[11px] font-mono text-recall-blue-muted">
          Illustrative preview of RECALL&apos;s local storage and context assembly pipeline. No active daemon connection is required for this marketing preview.
        </p>
      </div>
    </div>
  );
}
