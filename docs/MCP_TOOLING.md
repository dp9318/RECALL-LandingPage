# Antigravity MCP Tooling Guide

This guide configures the three requested tools for the RECALL landing page workflow: shadcn/ui MCP, 21st MCP (formerly Magic MCP), and Framelink Figma Context MCP.

## 1. Roles

- **shadcn MCP:** search, inspect, and install official shadcn/ui components and configured registries.
- **21st MCP:** discover and retrieve community-made components and patterns. Review code, dependencies, accessibility, license, and consistency before adopting.
- **Framelink Figma MCP:** inspect an accessible Figma file/frame so the coding agent can understand layout, typography, colors, spacing, and assets. It does not directly convert a Dribbble URL into a Figma document.

Use the tools to improve the outcome, not to abdicate design decisions. Keep all selected components aligned with `DESIGN.md`.

## 2. Antigravity configuration location

The documented global config on Windows is usually:

`%USERPROFILE%\.gemini\config\mcp_config.json`

A project/workspace config can live at:

`.agents/mcp_config.json`

Antigravity may also expose MCP servers through its MCP Store and raw-config UI. Prefer the UI where the server is listed. **Never overwrite the existing RECALL MCP server entry.** Merge new entries into the existing top-level `mcpServers` object.

For credential-bearing servers (21st and Figma), prefer the user's global configuration because a workspace config may be committed with the repository. Keep real tokens out of Git and screenshots.

## 3. Before setup

- Install a supported current Node.js LTS and verify `node -v` and `npm -v` in PowerShell.
- Generate a fresh 21st API key from [21st MCP](https://21st.dev/mcp).
- Create a Figma Personal Access Token with only required read access and ensure it can read the target design file.
- Back up the existing MCP configuration file.
- Do not paste real keys into chat, tracked JSON, PRs, issues, or logs.

## 4. Windows configuration example

Merge these entries into an existing config. Keep placeholder values replaced only in your local global config. This example does not include or replace your RECALL MCP server.

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "shadcn@latest", "mcp"]
    },
    "21st": {
      "serverUrl": "https://21st.dev/api/mcp",
      "headers": {
        "x-api-key": "REPLACE_WITH_YOUR_21ST_API_KEY"
      }
    },
    "figma-framelink": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "REPLACE_WITH_YOUR_FIGMA_ACCESS_TOKEN"
      }
    }
  }
}
```

If the existing config already has `mcpServers`, add each child entry under it; do not create a second JSON property with the same name. If a specific Antigravity build or server package requires a different transport field, follow the current official Antigravity + tool-specific documentation and verify the server's actual connection status.

Official references:
- [Antigravity MCP docs](https://antigravity.google/docs/mcp)
- [shadcn MCP docs](https://ui.shadcn.com/docs/mcp)
- [21st MCP installation guide](https://github.com/21st-dev/magic-mcp/blob/main/llms-install.md)
- [Framelink Figma MCP](https://github.com/GLips/Figma-Context-MCP)

## 5. Verification steps

1. Save the configuration.
2. Use Antigravity's MCP Servers manager / refresh controls or restart Antigravity if required.
3. Inspect each server's connection status and logs.
4. Ask shadcn to list/search a component; do not install yet.
5. Ask 21st to search for a hero or feature grid and return references; review before adoption.
6. Give Framelink a concrete Figma file/frame URL and confirm it can read the file.
7. If a tool fails, isolate it: validate the key, test Node/npm, confirm network access, inspect logs, then retry.

## 6. Safe workflow for RECALL

- Ask for options and source files before installation.
- Prefer shadcn primitives for buttons, dialogs, forms, separators and accessible controls.
- Use 21st patterns selectively; remove irrelevant dependencies, duplicate primitives, external analytics, or tracking code.
- Use Framelink after a Figma design exists. Until then, build against the Dribbble-inspired visual spec in `DESIGN.md`.
- Review licensing, accessibility, mobile behavior, bundle size, keyboard support and reduced-motion settings.
- Run lint/typecheck/tests after each integration.
