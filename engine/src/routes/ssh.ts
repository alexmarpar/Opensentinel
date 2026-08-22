import { Elysia, t } from "elysia";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import parseSSHKey from "../services/ssh/parseSSHKey";
import sanitizeName from "../services/ssh/sanitizeName";
import listDirectories from "../tools/listDirectories";
import { rm, stat, rename } from 'node:fs/promises';
import { PATHS } from "../services/storage/paths";
import { readFile } from "node:fs/promises"
import { isPathSafe } from "../services/storage/pathValidation";

export const ssh = new Elysia();

ssh.get("/ssh", async ( {query }) => {
  const { id } = query;
  if (id) {
    const configPath = join(PATHS.sshDir, id, 'config.json');
    if (!isPathSafe(PATHS.sshDir, join(PATHS.sshDir, id))) {
      return { error: "Invalid SSH ID" };
    }
    try {
    const config = await readFile(configPath, 'utf8');
    const configData = JSON.parse(config);
    return configData;

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
  const { name, host, port, username, password, privateKey, publicKey } = body;
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
    host: host,
    port: port,
    username: username,
    password: password,
    filekeys: !!(privateKey && publicKey)
  }
  await writeFile(
      join(dir, "config.json"),
      JSON.stringify(configData, null, 2),
      {
        mode: 0o600,
      }
    );

  return {
    safeName,
    path: dir,
  };
  }}, {

  body: t.Object({
    name: t.String(),
    host: t.String(),
    port: t.Number(),
    username: t.String(),
    password: t.Optional(t.String()),
    privateKey: t.Optional(t.String()),
    publicKey: t.Optional(t.String())
  })
 });

ssh.put("/ssh", async ({ body }) => {
  const { id, newid } = body;

  const oldDir = join(PATHS.sshDir, id);
  const newDir = join(PATHS.sshDir, sanitizeName(newid));

  if (!isPathSafe(PATHS.sshDir, oldDir) || !isPathSafe(PATHS.sshDir, newDir)) {
    return { error: "Invalid SSH ID" };
  }

  await rename(oldDir, newDir);

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


ssh.delete("/ssh", async ({ query }) => {
  const { id } = query;
  const dir = join(PATHS.sshDir, id);
  if (!isPathSafe(PATHS.sshDir, dir)) {
    return { error: "Invalid SSH ID" };
  }
  try {
  await rm(dir, { recursive: true, force: true });
} catch (error) {
  return {
    error: `Failed to delete directory: ${error}`
  };
}
 }, {
  query: t.Object({
    id: t.String()
  })
 });
