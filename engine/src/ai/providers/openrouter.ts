import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { ProviderConfig } from "../model";

export function create(config: ProviderConfig) {
  const provider = createOpenRouter({
    apiKey: config.apikey,
  });

  return provider(config.defaultModel);
}
/*
import { createOpenAI } from "@ai-sdk/openai";
import type { ProviderConfig } from "../model";

export function create(config: ProviderConfig) {
    const provider = createOpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: config.apikey
    });

    return provider(config.defaultModel);
}

*/