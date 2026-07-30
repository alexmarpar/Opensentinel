import { Elysia, t } from "elysia";
import { chat as chatFunction } from "../../ai/agent";
import { createSession } from "../../ai/storage/session";
import { generateSessionTitle } from "../../ai/generateSessionTitle";

export const chat = new Elysia();

chat.post("/chat", async ({ body }) => {
  let sessionId = body.sessionId;
  if (!sessionId) {
    const title = await generateSessionTitle(
      body.provider,
      body.message
    );
    const session = await createSession(title);
    sessionId = session.id;
    
    } 
    const result = await chatFunction({ ...body, sessionId });
    return {
      sessionId,
      response: result.text,
  }
}, {
  body: t.Object({
    provider: t.String(),
    message: t.String(),
    model: t.String(),
    sessionId: t.Optional(t.String())
  })
});