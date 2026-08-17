import { Elysia } from 'elysia';
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
  .use(cors())
  .use(networkStatus)
  .use(ssh)
  .use(provider)
  .use(session)
  .use(chat)
  .use(password)
  .listen(3000)
app.listen({
    hostname: "127.0.0.1",
    port: 3000
});
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);