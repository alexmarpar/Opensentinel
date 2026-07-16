import { Elysia, t } from "elysia";
import { generateText } from "ai";
import { chat as chatFunction } from "../../ai/agent";

export const chat = new Elysia();

chat.post("/chat", async ({ body, set }) => {
  const result = await chatFunction(body);
  
  return {
    success: true,
    data: result
  }
    
}, {
  body: t.Object({
    provider: t.String(),
    message: t.String(),
    model: t.Optional(t.String())
  })
 });









 