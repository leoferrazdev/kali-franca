import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer as createTcpServer } from 'node:net';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const repositoryRoot = resolve(root, '../..');

test('o servidor ancora o Next no diretório do app, independentemente do cwd', () => {
  const server = readFileSync(resolve(root, 'server.mjs'), 'utf8');

  assert.match(server, /fileURLToPath/);
  assert.match(server, /new URL\('\.', import\.meta\.url\)/);
  assert.match(server, /dir:\s*appDirectory/);
});

function getAvailablePort() {
  return new Promise((resolvePort, reject) => {
    const probe = createTcpServer();

    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const address = probe.address();
      const port = typeof address === 'object' && address !== null ? address.port : null;

      probe.close((error) => {
        if (error) {
          reject(error);
        } else if (port) {
          resolvePort(port);
        } else {
          reject(new Error('Não foi possível reservar uma porta para o smoke test.'));
        }
      });
    });
  });
}

async function waitForMembersResponse(url, child) {
  const timeout = setTimeout(() => {
    child.kill();
  }, 10_000);

  try {
    while (true) {
      if (child.exitCode !== null) {
        throw new Error(`O servidor encerrou antes da resposta HTTP (código ${child.exitCode}).`);
      }

      try {
        return await fetch(url);
      } catch {
        await new Promise((resolveRetry) => setTimeout(resolveRetry, 100));
      }
    }
  } finally {
    clearTimeout(timeout);
  }
}

test('o entrypoint responde quando iniciado a partir da raiz do monorepo', { skip: !existsSync(resolve(root, '.next', 'BUILD_ID')) }, async (t) => {
  const port = await getAvailablePort();
  const child = spawn(process.execPath, ['apps/kali-franca-membros/server.mjs'], {
    cwd: repositoryRoot,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  const stdout = [];

  child.stdout.on('data', (chunk) => stdout.push(chunk.toString()));
  t.after(() => {
    if (child.exitCode === null) child.kill();
  });

  const response = await waitForMembersResponse(`http://127.0.0.1:${port}/`, child);
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(body, /Área de membros/);
  assert.match(stdout.join(''), /Kali França Membros disponível/);
});
