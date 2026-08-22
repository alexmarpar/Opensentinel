import { Client, ClientChannel, ConnectConfig } from "ssh2";
import { PATHS } from "../services/storage/paths";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { sshMemory } from "../ai/tools/tools/ssh";

interface SSHConfig {
    host: string;
    port: number;
    username: string;
}

export class SSHManager {
    async connect(id: string, sessionId: string): Promise<Client> {
    const configPath = join(PATHS.sshDir, id, "config.json");

    const config: SSHConfig = JSON.parse(
        await readFile(configPath, "utf8")
    );
    const options = {
    host: config.host,
    port: config.port,
    username: config.username,
    } as ConnectConfig;

    const cacheKey = `${sessionId}:${id}`;
    const creds = sshMemory.get(cacheKey);
    if (creds) {
        options.password = creds.password;
    } else {
        options.privateKey = await readFile(
        join(PATHS.sshDir, id, "private_key"),
        "utf8");
    }
    

    return new Promise((resolve, reject) => {
        const conn = new Client();

        conn.on("ready", () => {
            resolve(conn);
        });

        conn.on("error", reject);

        conn.connect(options);
    });
}

    async createShell(id: string, sessionId: string) {
        const conn = await this.connect(id, sessionId);

        return new Promise<{ conn: Client; stream: ClientChannel }>((resolve, reject) => {
            conn.shell((err, stream) => {
                if (err) return reject(err);

                resolve({ conn, stream });
            });
        });
    }

    async execute(id: string, sessionId: string, command: string) {
        const conn = await this.connect(id, sessionId);

        return new Promise<string>((resolve, reject) => {
            conn.exec(command, (err, stream) => {
                if (err) return reject(err);

                let output = "";

                stream.on("data", (data: Buffer | string) => {
                    output += data.toString();
                });

                stream.stderr.on("data", (data: Buffer | string) => {
                    output += data.toString();
                });

                stream.on("close", () => {
                    conn.end();
                    resolve(output);
                });
            });
        });
    }
}