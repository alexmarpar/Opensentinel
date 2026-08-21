import { join, resolve } from "node:path";

export function isPathSafe(baseDir: string, targetPath: string): boolean {
  const resolvedBase = resolve(baseDir);
  const resolvedTarget = resolve(targetPath);
  return resolvedTarget.startsWith(resolvedBase + "/") || resolvedTarget === resolvedBase;
}

export function safeJoin(baseDir: string, ...segments: string[]): string {
  const joined = join(baseDir, ...segments);
  if (!isPathSafe(baseDir, joined)) {
    throw new Error("Path traversal detected");
  }
  return joined;
}
