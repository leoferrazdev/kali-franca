import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import next from 'next';

const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const hostname = '0.0.0.0';
const appDirectory = fileURLToPath(new URL('.', import.meta.url));
const app = next({ dev: false, hostname, port, dir: appDirectory });
const handle = app.getRequestHandler();

await app.prepare();

createServer((request, response) => {
  handle(request, response);
}).listen(port, hostname, () => {
  console.log(`Kalì Franca Membros disponível em http://${hostname}:${port}`);
});
