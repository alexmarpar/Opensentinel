import { join } from "node:path";
import { readFile } from "node:fs/promises";
import type { ModelMessage } from "ai";
import { mkdir, writeFile } from "node:fs/promises";
import { PATHS } from "../../services/storage/paths";

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

export async function listSessions(): Promise<string[]> {
  const { readdir } = await import("node:fs/promises");
  try {
    const dirs = await readdir(PATHS.sessionsDir);
    return dirs;
  } catch {
    return [];
  }
}

export async function renameSession(sessionId: string, newTitle: string): Promise<void> {
  const sessionPath = join(PATHS.sessionsDir, sessionId, "session.json");
  const raw = await readFile(sessionPath, "utf-8");
  const session = JSON.parse(raw);
  session.title = newTitle;
  session.updatedAt = new Date().toISOString();
  await writeFile(sessionPath, JSON.stringify(session, null, 2), "utf-8");
}

export async function deleteSession(sessionId: string): Promise<void> {
  const { rm } = await import("node:fs/promises");
  const sessionDir = join(PATHS.sessionsDir, sessionId);
  await rm(sessionDir, { recursive: true, force: true });
}