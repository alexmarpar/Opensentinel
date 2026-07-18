import { createOpenAI } from "@ai-sdk/openai";
import type { ProviderConfig } from "../model";

export function create(config: ProviderConfig) {
    const provider = createOpenAI({
        baseURL: "http://localhost:11434/v1",
        apiKey: config.apikey
    });

    return provider(config.defaultModel);
}