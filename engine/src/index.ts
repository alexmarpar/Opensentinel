import { Elysia } from 'elysia';
import { scan } from './routes/scan';
import { networkStatus } from './routes/network/status';
import { ssh } from './routes/ssh';
import { provider } from './routes/centinel/providers';
import { initStorage } from './services/storage/init';
import { cors } from "@elysiajs/cors";

await initStorage();

const app = new Elysia()
  .get("/", () => Bun.file("./src/public/index.html"))
  .use(cors())
  .use(scan)
  .use(networkStatus)
  .use(ssh)
  .use(provider)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);