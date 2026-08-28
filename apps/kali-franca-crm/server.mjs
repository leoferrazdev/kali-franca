import http from 'node:http';
import next from 'next';

const port = Number(process.env.PORT || 3000);
const hostname = process.env.HOSTNAME || '0.0.0.0';
const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

http
  .createServer((request, response) => handle(request, response))
  .listen(port, hostname, () => {
    console.log(`CRM Kali França listening on ${hostname}:${port}`);
  });
