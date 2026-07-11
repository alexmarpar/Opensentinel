import { Elysia, t } from "elysia";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import parseSSHKey from "../services/ssh/parseSHHKey";
import sanitizeName from "../services/ssh/sanitizeName";

export const ssh = new Elysia();

ssh.post("/ssh", async ({ body }) => {
  console.log(body);
  
  
  const { name, privateKey, publicKey } = body;

  console.log("name", name)
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