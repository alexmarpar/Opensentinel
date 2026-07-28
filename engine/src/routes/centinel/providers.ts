import { Elysia, t } from "elysia";
import { PATHS } from "../../services/storage/paths";
import { readdir, rm, stat } from 'node:fs/promises';
import listDirectories from "../../tools/listDirectories";
import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import sanitizeName from "../../services/ssh/sanitizeName";

export const provider = new Elysia();

interface ProviderConfig {
  apikey: string;
  defaultModel: string
}

provider.get("/providers", async ( {query }) => {
  const { id } = query;
  if (id) {
    try {
    const files = await readdir(join(PATHS.providers, id),
          { withFileTypes: true });
      
    return files;

    } catch (error) {
      console.error('Error reading the directory:', error);
    }
  }

  const directories = await listDirectories(PATHS.providers);
  return directories
  }, {
    query: t.Object({
      id: t.Optional(t.String()),
    })});

provider.post("/providers", async ({ body, set }) => {
  const { provider, apikey, model } = body;
  const safeName = sanitizeName(provider);
  const dir = join(PATHS.providers, `${safeName}`);
  try {
    await stat(dir);
    set.status = 409;
    return {
      error: "Repeated name"
    }
    } catch {
      await mkdir(dir, { recursive: true });

      await writeFile(join(dir, "config.json"),JSON.stringify(
        {
        apikey,
        defaultModel: body.model
        },
      null,
      2
    ),
    {
      mode: 0o600,
    }
    )
      return {
      safeName,
      path: dir,
    }}},{
  body: t.Object({
    provider: t.String(),
    apikey: t.String(),
    model: t.String()
  })
 });

provider.put("/providers", async ({ body }) => {
  const { provider, newapikey, model  } = body;
  const configPath = join(PATHS.providers, provider, "config.json");

  const config: ProviderConfig = JSON.parse(
  await readFile(configPath, "utf8")
);
  config.apikey = newapikey;
  if (model) {
    config.defaultModel = model;
  }

  await writeFile(
  configPath,
  JSON.stringify(config, null, 2),
  {
    mode: 0o600,
  }
);

  return {
    provider,
    path: configPath,
  };
  }, {
  
  body: t.Object({
    provider: t.String(), 
    newapikey: t.String(),
    model: t.Optional(t.String())
  })
 });
 
provider.delete("/providers/:provider", async ({ params }) => {
  const dir = join(PATHS.providers, params.provider);

  await rm(dir, {
    recursive: true,
    force: true
  });
  return {
    success: true
  };
});