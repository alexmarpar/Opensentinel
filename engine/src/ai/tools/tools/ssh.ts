import { tool } from "ai";
import { z } from "zod";
import { getConnection } from "../../../services/ssh/getConnection";
import { executeSSH } from "../../../services/ssh/executeSSH";

export const sshMemory = new Map();

export function clearSessionCredentials(sessionId: string) {
  for (const key of sshMemory.keys()) {
    if (key.startsWith(`${sessionId}:`)) {
      sshMemory.delete(key);
    }
  }
}

export function createSshTool(session: any) {
  return tool({
  description: 
  `Execute a shell command on a previously saved SSH connection.

  The 'connection' parameter is the NAME of an existing saved SSH profile.
  The tool automatically loads the host, port, username, authentication method,
  password/private key and all connection details.

  Never ask the user for hostname, IP, username, port or authentication details.
  If the user says "run on RedComputer", use connection="RedComputer".

  Only ask for a password if this tool returns SSH_PASSWORD_REQUIRED.
  If the connection does not exist, the tool will report it.`,

  inputSchema: z.object({
    connection: z.string().describe("Use the name of the machine provided in the SSH configuration. Do NOT use 'user@host'."),
    command: z.string(),
    timeout: z.number().default(30000).describe(
    "Maximum execution time in milliseconds."
  )
  }),

  execute: async ({ connection, command, timeout }) => {
    const config = await getConnection(connection);
    const cacheKey = `${session}:${connection}`;
    const creds = sshMemory.get(cacheKey);
    if (!config.password && !creds?.password) {
      throw new Error("SSH_PASSWORD_REQUIRED FOR INITIAL CONNECTION.");
    }
    const result = await executeSSH({
      host: config.host,
      port: config.port,
      username: config.username,
      password: creds?.password ?? config.password,
      privateKey: config.privateKey,
      command,
      timeout
    });
    return result;
    }})
} 