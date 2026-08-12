import { tool } from "ai";
import { z } from "zod";
import { sshMemory } from "./ssh";

export function createSaveSSHCredentialsTool(sessionId: string) {
    return tool({
        description: "Store an SSH password for the current session. Once stored, ask the user to use the saveSSHCredentials with a public key tool to store it.",
        inputSchema: z.object({
            connection: z.string(),
            password: z.string()
        }),
        execute: async ({ connection, password }) => {
            sshMemory.set(`${sessionId}:${connection}`, {
                password
            });

            return {
                success: true
            };
        }
    });
}