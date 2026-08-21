import { mkdir } from "node:fs/promises";
import { PATHS } from "./paths";

export async function initStorage() {
  await Promise.all([
    mkdir(PATHS.configDir, { recursive: true }),
    mkdir(PATHS.dataDir, { recursive: true }),
    mkdir(PATHS.sshDir, { recursive: true }),
    mkdir(PATHS.providers, { recursive: true }),
    mkdir(PATHS.sessionsDir, { recursive: true }),
  ]);
}