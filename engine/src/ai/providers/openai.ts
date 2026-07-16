import { createOpenAI } from "@ai-sdk/openai";
import type { ProviderConfig } from "../model";

export function create(config: ProviderConfig) {
    const provider = createOpenAI({
        apiKey: config.apikey,
    });

    return provider(config.defaultModel);
}