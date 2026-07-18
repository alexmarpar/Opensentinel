import { tool } from "ai";
import { z } from "zod";
import { PATHS } from "../../../services/storage/paths";
import { join } from "node:path";
import { readdir } from "node:fs/promises";
import { getConnection } from "../../../services/ssh/getConnection";
import { executeSSH } from "../../../services/ssh/executeSSH";

export const sshTool = tool({
  description: "Execute a command on a remote machine via SSH.",

  inputSchema: z.object({
    connection: z.string().describe("Use the name of the directory. Do NOT use 'user@host'."),
    command: z.string(),
    password: z.string().optional(),
    timeout: z.number().default(30000).describe(
    "Maximum execution time in milliseconds."
  )
  }),

  execute: async ({ connection, command, password, timeout }) => {
    const config = await getConnection(connection);
    await readdir(join(PATHS.sshDir, connection),
              { withFileTypes: true });

    const result = await executeSSH({
      host: config.host,
      port: config.port,
      username: config.username,
      password,
      privateKey: config.privateKey,
      command,
      timeout
    });
    return result;
    }})