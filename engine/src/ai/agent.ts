import { generateText, stepCountIs } from "ai";
import getModel from "./model";
import { registry } from "./tools/registry";
const SYSTEM_PROMPT = `
You are an AI assistant.

You can execute shell commands using the bash tool.

Never invent command outputs.

Use tools whenever necessary.
`;

export async function chat(body: {
  provider: string;
  message: string;
  model: string;
})
 {
  const model = await getModel(body.provider);

  const tools = registry.getTools();

  const response = await generateText({
    model,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: body.message
      }
    ],
    tools,
    stopWhen: stepCountIs(20),
  });

  return response;
}