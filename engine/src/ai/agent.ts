import { generateText, stepCountIs } from "ai";
import getModel from "./model";
import { getMessages, saveMessage } from "./storage/session";
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
  sessionId: string;
})
{
const model = await getModel(body.provider);

const tools = registry.getTools();
const history = await getMessages(body.sessionId);

await saveMessage(body.sessionId, {
  role: "user",
  content: body.message,
});

const response = await generateText({
  model,
  system: SYSTEM_PROMPT,
  messages: [
    ...history,
    {
      role: "user",
      content: body.message,
    },
  ],
  tools,
  stopWhen: stepCountIs(20),
});

await saveMessage(body.sessionId, {
  role: "assistant",
  content: response.text,
});

return response;
}