import type { ProviderConfig } from "../model";

function getModelFamily(modelId: string): "openai" | "anthropic" | "google" | "openai-compatible" {
  const id = modelId.toLowerCase();

  if (id.startsWith("gpt-") || id.startsWith("grok-") || id.startsWith("muse-")) {
    return "openai";
  }
  if (id.startsWith("claude-") || id.startsWith("qwen")) {
    return "anthropic";
  }
  if (id.startsWith("gemini-")) {
    return "google";
  }
  return "openai-compatible";
}

export async function create(config: ProviderConfig) {
  const baseURL = "https://opencode.ai/zen/v1";
  const family = getModelFamily(config.defaultModel);

  switch (family) {
    case "openai": {
      const { createOpenAI } = await import("@ai-sdk/openai");
      const provider = createOpenAI({ apiKey: config.apikey, baseURL });
      return provider(config.defaultModel);
    }
    case "anthropic": {
      const { createAnthropic } = await import("@ai-sdk/anthropic");
      const provider = createAnthropic({ apiKey: config.apikey, baseURL });
      return provider(config.defaultModel);
    }
    case "google": {
      const { createGoogle } = await import("@ai-sdk/google");
      const provider = createGoogle({ apiKey: config.apikey, baseURL });
      return provider(config.defaultModel);
    }
    case "openai-compatible": {
      const { createOpenAICompatible } = await import("@ai-sdk/openai-compatible");
      const provider = createOpenAICompatible({ apiKey: config.apikey, baseURL, name: "opencodezen" });
      return provider(config.defaultModel);
    }
  }
}
