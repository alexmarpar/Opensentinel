import { join } from "path";
import { readFile } from "node:fs/promises";
import type { ModelMessage } from "ai";
import { mkdir, writeFile } from "fs/promises";
import { PATHS } from "../../services/storage/paths";
import { password } from "bun";

export async function createSession(title : string) {
    const id = crypto.randomUUID();
    const dir = join(PATHS.sessionsDir, id);
    const now = new Date().toISOString();

    await mkdir(dir, { recursive: true });
    const session = {
    id,
    title,
    createdAt: now,
    updatedAt: now,
  }
    await writeFile(
      join(dir, "session.json"), 
      JSON.stringify(session, null, 2), 
      "utf-8"
    );
    await writeFile(
      join(dir, "messages.json"), 
      JSON.stringify([], null, 2), 
      "utf-8"
    );
    return session

}

export async function getMessages(
  sessionId: string
): Promise<ModelMessage[]> {
  const file = join(PATHS.sessionsDir, sessionId, "messages.json");

  try {
    const raw = await readFile(file, "utf-8");
    return JSON.parse(raw) as ModelMessage[];
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function saveMessage(
  sessionId: string,
  message: ModelMessage
): Promise<void> {
  const file = join(PATHS.sessionsDir, sessionId, "messages.json");

  const raw = await readFile(file, "utf-8");
  const messages = JSON.parse(raw) as ModelMessage[];

  messages.push(message);

  await writeFile(file, JSON.stringify(messages, null, 2), "utf-8");
}

export async function listSessions() {}

export async function renameSession() {}

export async function deleteSession() {}