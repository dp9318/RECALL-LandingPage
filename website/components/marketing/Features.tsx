import {
  Database,
  GitBranch,
  Layers,
  Search,
  ShieldCheck,
  Split,
} from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Persistent project memory",
    description:
      "Keep durable decisions and project context across sessions, with historical lineage where applicable.",
    badge: "Core",
  },
  {
    icon: Layers,
    title: "Explicit custom instructions",
    description:
      "Give user-authored global and project-scoped instructions clear priority over older context.",
    badge: "Precedence",
  },
  {
    icon: Search,
    title: "Context-aware retrieval",
    description:
      "Combine structured and keyword retrieval with semantic search to bring relevant memories into the current task.",
    badge: "Hybrid",
  },
  {
    icon: Split,
    title: "Conflict-aware context",
    description:
      "Apply deterministic precedence rules, use bounded local arbitration only when necessary, and return unresolved states when certainty is not justified.",
    badge: "Deterministic",
  },
  {
    icon: GitBranch,
    title: "Memory lineage and compaction",
    description:
      "Keep supersession and provenance visible while reducing active context without silently erasing canonical evidence.",
    badge: "Provenance",
  },
  {
    icon: ShieldCheck,
    title: "Local-first storage",
    description:
      "SQLite remains canonical; the semantic index is derived and rebuildable. Website authentication does not upload the local memory store.",
    badge: "Privacy",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative bg-recall-ink/60 border-t border-recall-blue-muted/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-recall-deep-blue/60 text-recall-amber border border-recall-blue-muted/20">
            Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Built for agents that build real systems.
          </h2>
          <p className="text-base sm:text-lg text-recall-blue-muted">
            Important architecture decisions, coding conventions, and previous fixes are easy to lose between conversations. RECALL gives your agent a persistent, inspectable context layer.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-card bg-recall-deep-blue/20 hover:bg-recall-deep-blue/35 border border-recall-blue-muted/20 hover:border-recall-amber/40 p-7 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-recall-deep-blue/70 border border-recall-blue-muted/25 flex items-center justify-center text-recall-amber group-hover:border-recall-amber/50 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-recall-blue-muted px-2.5 py-1 rounded-full bg-recall-ink/60 border border-recall-blue-muted/15">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-recall-amber transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-recall-blue-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-recall-blue-muted/10 flex items-center gap-2 text-xs font-mono text-recall-blue-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-recall-amber/60" />
                  Verified in local daemon
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
