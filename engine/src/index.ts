import { Elysia } from 'elysia';
import { scan } from './routes/scan';
import { networkStatus } from './routes/network/status';
import { ssh } from './routes/ssh';

const app = new Elysia()
  .get("/", () => Bun.file("./src/public/index.html"))
  .use(scan)
  .use(networkStatus)
  .use(ssh)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);