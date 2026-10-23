import { ImageResponse } from "next/og";


export const alt = "RECALL — Persistent Memory for AI Coding Agents";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#101E29",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #173548 0%, #101E29 60%), radial-gradient(circle at 80% 80%, rgba(228, 173, 112, 0.15) 0%, transparent 50%)",
          padding: "70px 80px",
          fontFamily: "system-ui, sans-serif",
          color: "#F4F0E8",
        }}
      >
        {/* Brand header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "#173548",
              border: "2px solid #E4AD70",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#E4AD70",
              fontSize: "30px",
              fontWeight: 800,
              fontFamily: "monospace",
            }}
          >
            R
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "26px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                fontFamily: "monospace",
                color: "#FFFFFF",
              }}
            >
              RECALL
            </span>
            <span
              style={{
                fontSize: "13px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#7895A4",
                fontFamily: "monospace",
              }}
            >
              Local-First Agent Memory
            </span>
          </div>
        </div>

        {/* Central editorial message */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "960px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 16px",
              borderRadius: "999px",
              backgroundColor: "rgba(23, 53, 72, 0.8)",
              border: "1px solid rgba(228, 173, 112, 0.4)",
              color: "#E4AD70",
              fontSize: "15px",
              fontFamily: "monospace",
              alignSelf: "flex-start",
            }}
          >
            <span>Model Context Protocol (MCP) · Windows 64-bit</span>
          </div>

          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Your AI agent forgets. <br />
            <span style={{ color: "#E4AD70" }}>RECALL doesn&apos;t.</span>
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#7895A4",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "850px",
            }}
          >
            Persistent cross-session project decisions, custom instructions, and memory lineage for AI coding agents.
          </p>
        </div>

        {/* Bottom meta badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(120, 149, 164, 0.2)",
            paddingTop: "24px",
            fontSize: "14px",
            color: "#7895A4",
            fontFamily: "monospace",
          }}
        >
          <span>SQLite Canonical Truth · ChromaDB Semantic Index</span>
          <span>Open Source MIT · github.com/dp9318/RECALL</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
