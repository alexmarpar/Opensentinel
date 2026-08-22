import { Elysia } from 'elysia';
import { networkStatus } from './routes/network/status';
import { ssh } from './routes/ssh';
import { provider } from './routes/centinel/providers';
import { session } from './routes/centinel/sessions';
import { chat } from './routes/centinel/chat';
import { password } from './routes/centinel/password';
import { initStorage } from './services/storage/init';
import { cors } from "@elysiajs/cors";
import { authMiddleware } from './services/auth/middleware';

await initStorage();

const app = new Elysia()
  .use(cors({
    origin: ["http://localhost:5173", "http://localhost:4173", "http://127.0.0.1:5173", "http://127.0.0.1:4173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }))
  .use(networkStatus)
  .use(authMiddleware)
  .use(ssh)
  .use(provider)
  .use(session)
  .use(chat)
  .use(password)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
