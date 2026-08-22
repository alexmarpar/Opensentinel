import type { Elysia } from "elysia";

const API_KEY = process.env.OPENSENTINEL_API_KEY || "";

export function authMiddleware(app: Elysia) {
  if (!API_KEY) {
    console.warn("⚠️  No OPENSENTINEL_API_KEY set. API is unprotected. Set the environment variable to enable authentication.");
    return app;
  }

  return app.derive(async ({ headers, set }) => {
    const authHeader = headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      set.status = 401;
      return { error: "Missing or invalid Authorization header. Use: Authorization: Bearer <API_KEY>" };
    }

    const token = authHeader.slice(7);
    if (token !== API_KEY) {
      set.status = 403;
      return { error: "Invalid API key" };
    }

    return {};
  });
}
