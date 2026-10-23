import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("Marketing SEO and AI Discoverability", () => {
  it("generates valid robots.txt rules excluding private routes", () => {
    const robotRules = robots();

    expect(robotRules.sitemap).toContain("/sitemap.xml");
    const rules = Array.isArray(robotRules.rules) ? robotRules.rules[0] : robotRules.rules;

    expect(rules).toBeDefined();
    expect(rules.allow).toBe("/");
    expect(rules.disallow).toContain("/api/");
    expect(rules.disallow).toContain("/auth/");
    expect(rules.disallow).toContain("/login");
    expect(rules.disallow).toContain("/download");
  });

  it("generates canonical sitemap with public homepage only", () => {
    const sitemapEntries = sitemap();

    expect(sitemapEntries.length).toBe(1);
    expect(sitemapEntries[0].url).toMatch(/^https?:\/\/.*\/$/);
    expect(sitemapEntries[0].priority).toBe(1.0);
    expect(sitemapEntries[0].changeFrequency).toBe("weekly");
  });

  it("provides truthful and well-structured llms.txt", () => {
    const llmsPath = path.resolve(import.meta.dirname, "../../public/llms.txt");
    expect(fs.existsSync(llmsPath)).toBe(true);

    const content = fs.readFileSync(llmsPath, "utf-8");

    // Must describe core identity truthfully
    expect(content).toContain("persistent memory engine");
    expect(content).toContain("Model Context Protocol");
    expect(content).toContain("SQLite");
    expect(content).toContain("ChromaDB");

    // Must clearly state what RECALL is NOT
    expect(content).toContain("RECALL is NOT a standalone chatbot");

    // Must preserve local-first invariant
    expect(content).toContain("Local-first persistence");

    // Must include official repo links
    expect(content).toContain("https://github.com/dp9318/RECALL");
  });
});
