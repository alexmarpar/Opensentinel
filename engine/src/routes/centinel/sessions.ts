import { Elysia, t } from "elysia";
import { PATHS } from "../../services/storage/paths";
import { readdir, rm, stat } from 'node:fs/promises';
import { join } from "path";
import { chat as chatFunction } from "../../ai/agent";

export const session = new Elysia();

session.get("/sessions", async ( {query }) => {
  const { id } = query;
  if (id) {
    try {
    const files = await readdir(join(PATHS.providers, id),
          { withFileTypes: true });
      
    return files;

    } catch (error) {
      console.error('Error reading the directory:', error);
    }
}})
