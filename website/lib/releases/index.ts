/**
 * Release metadata contract for RECALL.
 * Sourced according to docs/ARCHITECTURE.md, docs/AUTH_AND_DOWNLOAD.md, and docs/DECISIONS.md.
 * Do NOT scatter release strings across client components.
 */

import { getEnv } from "@/lib/env";

export interface ReleaseInfo {
  version: string;
  targetPlatform: string;
  osRequirements: string[];
  pythonRequirements: string;
  storageBucket: string;
  objectPath: string;
  downloadFilename: string;
  documentationUrl: string;
  repositoryUrl: string;
}

export function getActiveRelease(): ReleaseInfo {
  const env = getEnv();
  const version = env.currentReleaseVersion;

  return {
    version,
    targetPlatform: "Windows (64-bit)",
    osRequirements: [
      "Windows 10 (build 19041+) or Windows 11",
      "64-bit architecture (x64)",
    ],
    pythonRequirements: "Python 3.11 or 3.12 in PATH",
    storageBucket: env.supabaseReleaseBucket,
    objectPath: env.supabaseReleaseObjectPath.replace("<version>", version),
    downloadFilename: `recall-${version}-windows.zip`,
    documentationUrl: "https://github.com/dp9318/RECALL#readme",
    repositoryUrl: "https://github.com/dp9318/RECALL",
  };
}
