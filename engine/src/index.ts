import { Elysia } from 'elysia';
import { scan } from './routes/scan';
import { networkStatus } from './routes/network/status';
import { ssh } from './routes/ssh';
import { provider } from './routes/centinel/providers';
import { session } from './routes/centinel/sessions';
import { chat } from './routes/centinel/chat';
import { password } from './routes/centinel/password';
import { initStorage } from './services/storage/init';
import { cors } from "@elysiajs/cors";

initStorage();

const app = new Elysia()
  .get("/", () => Bun.file("./src/public/sshindex.html"))
  .use(cors())
  .use(scan)
  .use(networkStatus)
  .use(ssh)
  .use(provider)
  .use(session)
  .use(chat)
  .use(password)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);