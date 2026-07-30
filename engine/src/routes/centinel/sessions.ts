import { Elysia, t } from "elysia";
import { PATHS } from "../../services/storage/paths";
import { readdir, rm, stat } from 'node:fs/promises';
import { join } from "path";
import { chat as chatFunction } from "../../ai/agent";
import { readFile } from "node:fs/promises";

export const session = new Elysia();

session.get("/sessions", async ( {query }) => {
  const { id } = query;
  const { message } = query;
  if (id && message) {
      try {
        const messagesPath = join(PATHS.sessionsDir, id, 'messages.json');
        const messagesData = await readFile(messagesPath, 'utf8');
        const messages = JSON.parse(messagesData);
        return { response: messages };
      } catch (error) {
        console.error('Error reading the messages file:', error);
      }
  }
  if (id) {
    try {
    const configPath = join(PATHS.sessionsDir, id, 'session.json');
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