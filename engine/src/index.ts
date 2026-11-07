import { Elysia } from 'elysia';
import { networkStatus } from './routes/network/status';
import { ssh } from './routes/ssh/ssh';
import { provider } from './routes/centinel/providers';
import { session } from './routes/centinel/sessions';
import { chat } from './routes/centinel/chat';
import { password } from './routes/centinel/password';
import { initStorage } from './services/storage/init';
import { cors } from "@elysiajs/cors";
import { authMiddleware } from './services/auth/middleware';
import { connect } from './routes/ssh/connect'; 

await initStorage();

const isWindows = process.platform === 'win32';
const agentSocket = isWindows 
  ? '\\\\.\\pipe\\openssh-ssh-agent'  
  : Bun.env.SSH_AUTH_SOCK;

const app = new Elysia()
  .use(cors({
    origin: ["http://127.0.0.1:5173","http://127.0.0.1:4173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }))
  .use(networkStatus)
  .use(authMiddleware)
  .use(ssh)
  .use(provider)
  .use(session)
  .use(chat)
  .use(password)
  .use(connect)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
