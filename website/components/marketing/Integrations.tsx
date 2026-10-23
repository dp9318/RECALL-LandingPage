import { ArrowUpRight, Network, Terminal } from "lucide-react";

const integrations = [
  {
    name: "Model Context Protocol (MCP) Hosts",
    type: "Open Protocol Specification",
    description:
      "RECALL runs as a local MCP server over stdio or SSE transport. Connects to any AI coding assistant or harness supporting the open Model Context Protocol.",
    docsAnchor: "https://github.com/dp9318/RECALL#readme",
    badge: "Standard MCP Server",
  },
  {
    name: "MCP-Compatible Coding Clients",
    type: "Client Configuration",
    description:
      "Connects to desktop or terminal coding environments that accept custom MCP server definitions. Configured locally using standard JSON server entries per project documentation.",
    docsAnchor: "https://github.com/dp9318/RECALL#readme",
    badge: "Configurable Host",
  },
  {
    name: "Command-Line & Stdio Agent Loops",
    type: "stdio Transport",
    description:
      "Standard input/output bridge designed for autonomous coding loops, CLI agent testbenches, and local developer automation scripts.",
    docsAnchor: "https://github.com/dp9318/RECALL#readme",
    badge: "Direct stdio",
  },
  {
    name: "Local Daemon REST / HTTP API",
    type: "Local FastAPI Daemon",
    description:
      "Exposes local HTTP endpoints powering the local RECALL dashboard and programmatic inspection without relying on external cloud APIs.",
    docsAnchor: "https://github.com/dp9318/RECALL#readme",
    badge: "Local HTTP API",
  },
];

export function Integrations() {
  return (
    <section id="integrations" className="py-24 relative bg-recall-ink border-t border-recall-blue-muted/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-recall-deep-blue/60 text-recall-amber border border-recall-blue-muted/20">
            <Network className="w-3.5 h-3.5" />
            Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Connect RECALL to your agent workflow.
          </h2>
          <p className="text-base sm:text-lg text-recall-blue-muted">
            RECALL exposes standardized MCP tools to your favorite coding agents without locking you into a proprietary cloud interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-card bg-recall-deep-blue/20 hover:bg-recall-deep-blue/35 border border-recall-blue-muted/20 hover:border-recall-amber/40 p-7 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-recall-amber px-2.5 py-0.5 rounded-full bg-recall-amber/10 border border-recall-amber/25">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono text-recall-blue-muted">
                    {item.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-recall-amber transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-recall-blue-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-recall-blue-muted/15 flex items-center justify-between">
                <span className="text-xs font-mono text-recall-blue-muted flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  Local stdio / SSE transport
                </span>
                <a
                  href={item.docsAnchor}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-recall-amber hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
                >
                  Setup docs <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-recall-blue-muted font-mono">
            Requires Python 3.11+ and 64-bit Windows. See the{" "}
            <a
              href="https://github.com/dp9318/RECALL#readme"
              target="_blank"
              rel="noreferrer"
              className="text-recall-amber hover:underline"
            >
              official README setup guide
            </a>{" "}
            for step-by-step configuration.
          </p>
        </div>
      </div>
    </section>
  );
}
