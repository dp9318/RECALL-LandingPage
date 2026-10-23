import { History } from "lucide-react";

export function ProblemStatement() {
  return (
    <section className="py-20 relative bg-gradient-to-b from-recall-ink via-recall-deep-blue/20 to-recall-ink/60 border-t border-recall-blue-muted/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-recall-deep-blue/50 border border-recall-blue-muted/20 text-xs font-mono text-recall-amber mb-6">
          <History className="w-3.5 h-3.5 text-recall-amber" />
          <span>The Cross-Session Memory Gap</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
          Your coding agent is capable. <br className="hidden sm:inline" />
          <span className="text-recall-cream/90">
            Its context shouldn&apos;t reset every session.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-recall-blue-muted max-w-3xl mx-auto leading-relaxed font-normal">
          Important architecture decisions, coding conventions, and previous fixes are easy to lose between conversations. RECALL gives your agent a persistent, inspectable context layer instead of asking you to repeat the same background every time.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left font-mono text-xs">
          <div className="p-4 rounded-xl bg-recall-deep-blue/25 border border-recall-blue-muted/15">
            <span className="text-recall-amber font-semibold block mb-1">01 / Session Loss</span>
            <span className="text-recall-cream/80">Context compaction and restarts erase subtle project conventions.</span>
          </div>
          <div className="p-4 rounded-xl bg-recall-deep-blue/25 border border-recall-blue-muted/15">
            <span className="text-recall-amber font-semibold block mb-1">02 / Conflict Regressions</span>
            <span className="text-recall-cream/80">Older prompts contradict newer architectural decisions silently.</span>
          </div>
          <div className="p-4 rounded-xl bg-recall-deep-blue/25 border border-recall-blue-muted/15">
            <span className="text-recall-amber font-semibold block mb-1">03 / Hallucinated History</span>
            <span className="text-recall-cream/80">Agents guess past rationale without deterministic evidence lineage.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
