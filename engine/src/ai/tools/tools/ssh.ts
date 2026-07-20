import { tool } from "ai";
import { z } from "zod";
import { PATHS } from "../../../services/storage/paths";
import { join } from "node:path";
import { readdir } from "node:fs/promises";
import { getConnection } from "../../../services/ssh/getConnection";
import { executeSSH } from "../../../services/ssh/executeSSH";

export const sshMemory = new Map();

export function createSshTool(session: any) {
  return tool({
  description: "Execute a command on a remote machine via SSH.",

  inputSchema: z.object({
    connection: z.string().describe("Use the name of the directory. Do NOT use 'user@host'."),
    command: z.string(),
    timeout: z.number().default(30000).describe(
    "Maximum execution time in milliseconds."
  )
  }),

  execute: async ({ connection, command, timeout }) => {
    const config = await getConnection(connection);
    await readdir(join(PATHS.sshDir, connection),
              { withFileTypes: true });
    const cacheKey = `${session}:${connection}`;
    const creds = sshMemory.get(cacheKey);
    if (!config.password && !creds.password) {
      throw new Error("SSH_PASSWORD_REQUIRED FOR INITIAL CONNECTION.");
    }
    const result = await executeSSH({
      host: config.host,
      port: config.port,
      username: config.username,
      password: creds.password || config.password,
      privateKey: config.privateKey,
      command,
      timeout
    });
    return result;
    }})
} 