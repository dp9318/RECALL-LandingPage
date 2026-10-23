import { describe, expect, it } from "vitest";
import { getActiveRelease } from "@/lib/releases";

describe("getActiveRelease contract", () => {
  it("provides versioned release information matching repository docs", () => {
    const release = getActiveRelease();

    expect(release.version).toBeDefined();
    expect(release.targetPlatform).toContain("Windows");
    expect(release.downloadFilename).toMatch(/^recall-.*-windows\.zip$/);
    expect(release.osRequirements.length).toBeGreaterThan(0);
    expect(release.pythonRequirements).toContain("Python");
    expect(release.storageBucket).toBe("recall-releases");
    expect(release.repositoryUrl).toBe("https://github.com/dp9318/RECALL");
  });
});
