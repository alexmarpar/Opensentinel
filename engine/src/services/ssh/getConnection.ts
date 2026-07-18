import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PATHS } from "../storage/paths";

export async function getConnection(id: string) {
  const configPath = join(PATHS.sshDir, id, "config.json");
  const config = JSON.parse(await readFile(configPath, "utf8"));

   if (config.privateKey) {
    const privateKeyPath = join(PATHS.sshDir, id, config.privateKey);
    config.privateKey = await readFile(privateKeyPath, "utf8");
  }

  return config;
}