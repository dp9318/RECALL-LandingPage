import { describe, expect, it } from "vitest";
import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { ProblemStatement } from "@/components/marketing/ProblemStatement";
import { Features } from "@/components/marketing/Features";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Integrations } from "@/components/marketing/Integrations";
import { DownloadCta } from "@/components/marketing/DownloadCta";
import { Footer } from "@/components/marketing/Footer";
import { ProductVisual } from "@/components/marketing/ProductVisual";
import { getActiveRelease } from "@/lib/releases";

describe("Marketing UI Components export integrity", () => {
  it("exports all required marketing components as functions", () => {
    expect(typeof Navbar).toBe("function");
    expect(typeof Hero).toBe("function");
    expect(typeof ProblemStatement).toBe("function");
    expect(typeof Features).toBe("function");
    expect(typeof HowItWorks).toBe("function");
    expect(typeof Integrations).toBe("function");
    expect(typeof DownloadCta).toBe("function");
    expect(typeof Footer).toBe("function");
    expect(typeof ProductVisual).toBe("function");
  });

  it("sources verified release metadata from single source of truth", () => {
    const release = getActiveRelease();
    expect(release.version).toBeDefined();
    expect(release.targetPlatform).toContain("Windows");
    expect(release.repositoryUrl).toBe("https://github.com/dp9318/RECALL");
    expect(release.downloadFilename).toContain(release.version);
  });
});

