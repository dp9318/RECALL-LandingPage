import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Capture",
    description: "Preserve durable project decisions, architectural constraints, and explicit user rules during active coding sessions.",
  },
  {
    step: "02",
    title: "Retrieve",
    description: "Locate relevant memories instantly by combining structured SQLite filtering with derived ChromaDB vector embeddings.",
  },
  {
    step: "03",
    title: "Resolve",
    description: "Apply deterministic precedence rules to resolve contradictory memories without hallucinating or losing lineage.",
  },
  {
    step: "04",
    title: "Return Context",
    description: "Serve clean, validated context directly into the agent's prompt through standard Model Context Protocol (MCP) tools.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative bg-recall-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-recall-deep-blue/60 text-recall-amber border border-recall-blue-muted/20">
            Pipeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            How RECALL powers your agent
          </h2>
          <p className="text-base sm:text-lg text-recall-blue-muted">
            From session capture to clean context injection, RECALL automates memory management while keeping you in complete control.
          </p>
        </div>

        {/* 4-Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-card bg-recall-deep-blue/25 border border-recall-blue-muted/20 p-7 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-3xl font-extrabold text-recall-amber/80 mb-4 block">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-recall-blue-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-recall-blue-muted/15 flex items-center justify-between text-xs text-recall-blue-muted font-mono">
                <span>Step {item.step}</span>
                <ArrowRight className="w-4 h-4 text-recall-amber" />
              </div>
            </div>
          ))}
        </div>

        {/* Privacy & Trust statement */}
        <div
          id="privacy"
          className="mt-16 rounded-card bg-gradient-to-r from-recall-deep-blue/40 via-recall-deep-blue/20 to-recall-ink border border-recall-blue-muted/30 p-8 sm:p-10"
        >
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                Local-First Invariant
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Your memory stays on your device.
            </h3>
            <p className="text-sm text-recall-blue-muted leading-relaxed">
              RECALL stores memories in a local SQLite database on your machine. Semantic indexing runs locally in ChromaDB. The website authentication portal exists strictly for binary licensing and downloads—your project code, prompts, memories, and instructions are never uploaded to the marketing site or cloud storage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
