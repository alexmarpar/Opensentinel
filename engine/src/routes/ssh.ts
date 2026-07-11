import { Elysia, t } from "elysia";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import parseSSHKey from "../services/ssh/parseSHHKey";
import sanitizeName from "../services/ssh/sanitizeName";
import listDirectories from "../tools/listDirectories";
import { readdir, rm } from 'node:fs/promises';
import { renameSync } from "node:fs"
export const ssh = new Elysia();

ssh.get("/ssh", async ( {query }) => {
  const { id } = query;
  if (id) {
    try {
    const files = await readdir(join(process.cwd(), "data", "ssh", id), { withFileTypes: true });
      
    return files;

    } catch (error) {
      console.error('Error reading the directory:', error);
    }
  }

  const directories = await listDirectories(join(process.cwd(), "data", "ssh"));
  return directories
  }, {
    query: t.Object({
      id: t.Optional(t.String()),
    })});
 

ssh.post("/ssh", async ({ body }) => {
  const { name, privateKey, publicKey } = body;
  const safeName = sanitizeName(name);
  const id = randomUUID();
  const dir = join(process.cwd(), "data", "ssh", `${safeName}-${id}`);

  await mkdir(dir, { recursive: true });

  await writeFile(join(dir, parseSSHKey(privateKey).filename), privateKey, {
    mode: 0o600
  });

  if (publicKey) {
    await writeFile(join(dir, parseSSHKey(publicKey).filename), publicKey);
  }

  return {
    id,
    path: dir,
  };
  }, {
  
  body: t.Object({
    name: t.String(),
    privateKey: t.String(),
    publicKey: t.String()
  })
 });

ssh.get("/ssh", async ( {query }) => {
  const { id } = query;
  if (id) {
    try {
    const files = await readdir(join(process.cwd(), "data", "ssh", id), { withFileTypes: true });
      
    return files;

    } catch (error) {
      console.error('Error reading the directory:', error);
    }
  }

  const directories = await listDirectories(join(process.cwd(), "data", "ssh"));
  return directories
  }, {
    query: t.Object({
      id: t.Optional(t.String()),
    })});
  
ssh.put("/ssh", async ({ body }) => {
  const { id, newid,  } = body;
  
  const oldDir = join(process.cwd(), "data", "ssh", id);
  const newDir = join(process.cwd(), "data", "ssh", sanitizeName(newid));

  await renameSync(oldDir, newDir);

  return {
    id,
    path: newDir,
  };
  }, {
  
  body: t.Object({
    id: t.String(),
    newid: t.String()
  })
 });
 

ssh.delete("/ssh", async ({ body }) => {
  console.log("Received request to delete directory:", body);
  const { id } = body;
  const dir = join(process.cwd(), "data", "ssh", id); 
  try {
  await rm(dir, { recursive: true, force: true });
} catch (error) {
  return {
    error: `Failed to delete directory: ${error}`
  };
}
 }, {
  body: t.Object({
    id: t.String()
  })
 });
