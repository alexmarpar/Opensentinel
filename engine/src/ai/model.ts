import fs from "node:fs/promises";
import path from "node:path";
import { PATHS } from "../services/storage/paths";

export interface ProviderConfig {
    apikey: string;
    defaultModel: string;
}

export default async function getModel(providerName: string) {
    const configPath = path.join(PATHS.providers, providerName, "config.json");

    const raw = await fs.readFile(configPath, "utf8");
    const config: ProviderConfig = JSON.parse(raw);

    const provider = await import(`./providers/${providerName}`);

    return provider.create(config);
}