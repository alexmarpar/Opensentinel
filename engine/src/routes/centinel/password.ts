import { Elysia, t } from "elysia";
import { sshMemory } from "../../ai/tools/tools/ssh";

export const password = new Elysia();

password.post("/password", async ({ body }) => {
  const { sessionId, connection, password } = body;

  const cacheKey = `${sessionId}:${connection}`;
  sshMemory.set(cacheKey, { password });

  return {
    success: true,
    data: {
      sessionId,
    }
  };
}, {
  body: t.Object({
    sessionId: t.String(),
    connection: t.String(),
    password: t.String()
  })
});