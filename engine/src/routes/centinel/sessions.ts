import { Elysia, t } from "elysia";
import { PATHS } from "../../services/storage/paths";
import { readdir, rm } from 'node:fs/promises';
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { isPathSafe } from "../../services/storage/pathValidation";

export const session = new Elysia();

session.get("/sessions", async ( {query }) => {
  const { id } = query;
  const { message } = query;
  if (id && message) {
      const dir = join(PATHS.sessionsDir, id);
      if (!isPathSafe(PATHS.sessionsDir, dir)) {
        return { error: "Invalid session ID" };
      }
      try {
        const messagesPath = join(dir, 'messages.json');
        const messagesData = await readFile(messagesPath, 'utf8');
        const messages = JSON.parse(messagesData);
        return { response: messages };
      } catch (error) {
        console.error('Error reading the messages file:', error);
      }
  }
  if (id) {
    const dir = join(PATHS.sessionsDir, id);
    if (!isPathSafe(PATHS.sessionsDir, dir)) {
      return { error: "Invalid session ID" };
    }
    try {
    const configPath = join(dir, 'session.json');
    const config = await readFile(configPath, 'utf8');
    const { title } = JSON.parse(config);
      return { response: title };
    } catch (error) {
      console.error('Error reading the directory:', error);
    }

  } else {
  const directories = await readdir(PATHS.sessionsDir);
  return directories
  }}
)
session.delete("/sessions", async ({ query }) => {
  const { id } = query;
  const dir = join(PATHS.sessionsDir, id);
  if (!isPathSafe(PATHS.sessionsDir, dir)) {
    return { error: "Invalid session ID" };
  }
  try {
    await rm(dir, { recursive: true, force: true });
    return {
      message: `Directory ${id} deleted successfully.`,
    };
  } catch (error) {
    console.error('Error deleting the directory:', error);
    return { error: `Failed to delete directory ${id}.` };
  }
}, {
  query: t.Object({
    id: t.String()
  })
});
