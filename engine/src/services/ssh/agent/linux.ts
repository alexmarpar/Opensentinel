
import { Elysia } from "elysia";
import { Client } from "ssh2";
import crypto from "crypto";

const connections = new Map<string, Client>();

export const sshAgent = new Elysia();

const agentSocket = process.env.SSH_AUTH_SOCK;

export default function connectToSSHAgent(
    host: string,
    username: string
) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        const id = crypto.randomUUID();

        conn.on("ready", () => {
            connections.set(id, conn);

            resolve({
                success: true,
                id,
                host,
                username
            });
        });

        conn.on("error", (err) => {
            reject(err);
        });

        conn.on("close", () => {
            connections.delete(id);
        });

        conn.connect({
            host,
            port: 22,
            username,
            agent: agentSocket
        });
    });
}