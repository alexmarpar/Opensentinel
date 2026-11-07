
import { Elysia, t} from "elysia";
import connectToSSHAgent from "../../services/ssh/agent/linux";
import { join } from "node:path";
import { PATHS } from "../../services/storage/paths";
import { isPathSafe } from "../../services/storage/pathValidation";
import { readFile } from "node:fs/promises";

export const connect = new Elysia();

connect.post("/connect", async ({ body }) => {
    const { id } = body;
    const configPath = join(PATHS.sshDir, id, 'config.json');
    if (!isPathSafe(PATHS.sshDir, join(PATHS.sshDir, id))) {
          return { error: "Invalid SSH ID" };
        }
    try {
        const config = await readFile(configPath, 'utf8');
            const configData = JSON.parse(config);
        console.log("Connecting to SSH Agent with config:", configData);
        const result = await connectToSSHAgent(
            configData.host,
            configData.username
        );

        return result;
    } catch (err: any) {
        return new Response(err.message, {
            status: 500
        });
    }
}, {
    body: t.Object({
        id: t.String(),
    })
});