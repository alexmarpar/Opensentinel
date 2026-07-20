import { Elysia, t } from "elysia";
import { sshMemory } from "../../ai/tools/tools/ssh";

export const password = new Elysia();

password.post("/password", async ({ body }) => {
  const { sessionId, connection, password } = body;

  const cacheKey = `${sessionId}:${connection}`;
  sshMemory.set(cacheKey, { password });

  const result = { ...body, sessionId };
  return {
    success: true,
    data: {
      sessionId,
      response: result,
    }
  };
}, {
  body: t.Object({
    sessionId: t.String(),
    connection: t.String(),
    password: t.String()
  })
});