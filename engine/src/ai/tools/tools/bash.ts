import { tool } from "ai";
import { z } from "zod";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export const bashTool = tool({
  description: "Execute a shell command on the local machine.",

  inputSchema: z.object({
    command: z.string()
  }),

  execute: async ({ command }) => {
    const { stdout, stderr } = await execAsync(command);

    return {
      stdout,
      stderr
    };
  }
});