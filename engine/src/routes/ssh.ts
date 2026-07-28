import { Elysia, t } from "elysia";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import parseSSHKey from "../services/ssh/parseSHHKey";
import sanitizeName from "../services/ssh/sanitizeName";
import listDirectories from "../tools/listDirectories";
import { readdir, rm, stat } from 'node:fs/promises';
import { PATHS } from "../services/storage/paths";
import { renameSync } from "node:fs"
export const ssh = new Elysia();

ssh.get("/ssh", async ( {query }) => {
  const { id } = query;
  if (id) {
    try {
    const files = await readdir(join(PATHS.sshDir, id),
          { withFileTypes: true });
      
    return files;

    } catch (error) {
      console.error('Error reading the directory:', error);
    }
  }

  const directories = await listDirectories(PATHS.sshDir);
  return directories
  }, {
    query: t.Object({
      id: t.Optional(t.String()),
    })});
 

ssh.post("/ssh", async ({ body, set }) => {
  const { name, ip, port, username, password, privateKey, publicKey } = body;
  const safeName = sanitizeName(name);
  const dir = join(PATHS.sshDir, `${safeName}`);
  try {
  await stat(dir);
  set.status = 409;
  return {
    error: "Repeated name"
  }
  } catch {
  await mkdir(dir, { recursive: true });

  if (privateKey) {
    await writeFile(join(dir, parseSSHKey(privateKey).filename), privateKey, {
      mode: 0o600
    });
  }

  if (publicKey) {
    await writeFile(join(dir, parseSSHKey(publicKey).filename), publicKey);
  }

  const configData = {
    host: ip,
    port: port,
    username: username,
    password: password,
  }
  await writeFile(
      join(dir, "config.json"), 
      JSON.stringify(configData, null, 2), 
      "utf-8"
    );

  return {
    safeName,
    path: dir,
  };
  }}, {
  
  body: t.Object({
    name: t.String(),
    ip: t.String(),
    port: t.Number(),
    username: t.String(),
    password: t.Optional(t.String()),
    privateKey: t.Optional(t.String()),
    publicKey: t.Optional(t.String())
  })
 });

ssh.get("/ssh", async ( {query }) => {
  const { id } = query;
  if (id) {
    try {
    const files = await readdir(  join(PATHS.sshDir, id),
          { withFileTypes: true });
      
    return files;

    } catch (error) {
      console.error('Error reading the directory:', error);
    }
  }

  const directories = await listDirectories(PATHS.sshDir);
  return directories
  }, {
    query: t.Object({
      id: t.Optional(t.String()),
    })});
  
ssh.put("/ssh", async ({ body }) => {
  const { id, newid,  } = body;
  
  const oldDir = join(PATHS.sshDir, id);
  const newDir = join(PATHS.sshDir, sanitizeName(newid));

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
  const dir = join(PATHS.sshDir, id); 
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