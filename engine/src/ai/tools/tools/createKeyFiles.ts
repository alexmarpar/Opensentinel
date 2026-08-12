// Create a tool that saves SSH credentials for the current session.
// This tool is used to store a public key file in the connection's directory, whitelist ssh directory, and store the private keyfile in the ssh directory.
import { tool } from "ai";
import { z } from "zod";

const requestUserInputSchema = z.object({
    component: z.string(),
    connection: z.string(),
    fields: z.array(
        z.object({
            name: z.string(),
            type: z.string(),
            label: z.string()
        })
    )
});

export function createRequestUserInputTool() {
    return tool({
        description: "Request information from the user through the frontend UI.",
        inputSchema: requestUserInputSchema,

        execute: async ({ component, connection, fields }) => {
            return {
                type: "ui_request",
                action: "ssh_credentials",
                component,
                connection,
                fields
            };
        }
    });
}