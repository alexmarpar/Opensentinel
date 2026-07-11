import { Elysia } from "elysia";
import { scan } from "./routes/scan";
import { networkStatus } from "./routes/network/status";

const app = new Elysia()
  .get("/", () => Bun.file("./src/public/index.html"))
  .use(scan)
  .use(networkStatus)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
