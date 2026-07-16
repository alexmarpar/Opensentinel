import { createGoogle } from "@ai-sdk/google";
import type { ProviderConfig } from "../model";

export function create(config: ProviderConfig) {
    const provider = createGoogle({
        apiKey: config.apikey,
    });

    return provider(config.defaultModel);
}