import { generateText } from "ai";
import getModel from "./model";

export async function generateSessionTitle(
  provider: string,
  message: string
) {
  const model = await getModel(provider);

  const { text } = await generateText({
    model,
    system: `
You generate titles for chat conversations.

Rules:
- Maximum 5 words.
- No quotes.
- No punctuation at the end.
- Return ONLY the title.
`,
    prompt: message,
    maxOutputTokens: 20,
  });
  return text.trim();
}