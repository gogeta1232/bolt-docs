#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DEFAULT_COMMANDS_URL =
  'https://raw.githubusercontent.com/gogeta1232/Bolt-OS/main/site/src/data/commands.json';
const MAX_BYTES = 1_000_000;

export function validateRegistry(data) {
  if (
    !data ||
    typeof data !== 'object' ||
    !Array.isArray(data.commands) ||
    data.count !== data.commands.length ||
    typeof data.defaultPrefix !== 'string' ||
    data.defaultPrefix.length < 1 ||
    data.defaultPrefix.length > 5
  ) {
    throw new Error('Invalid command registry');
  }
  const names = new Set();
  for (const command of data.commands) {
    if (
      !command ||
      typeof command !== 'object' ||
      typeof command.name !== 'string' ||
      !/^[a-z0-9_-]{1,32}$/.test(command.name) ||
      names.has(command.name) ||
      typeof command.description !== 'string' ||
      typeof command.module !== 'string' ||
      !Array.isArray(command.aliases) ||
      command.aliases.some((alias) => typeof alias !== 'string') ||
      typeof command.supportsSlash !== 'boolean' ||
      typeof command.supportsPrefix !== 'boolean'
    ) {
      throw new Error('Invalid command entry');
    }
    names.add(command.name);
  }
  return data;
}

export async function fetchRegistry(url = DEFAULT_COMMANDS_URL, fetcher = fetch) {
  const parsed = new URL(url);
  if (
    parsed.protocol !== 'https:' ||
    parsed.hostname !== 'raw.githubusercontent.com' ||
    parsed.username ||
    parsed.password ||
    parsed.port
  ) {
    throw new Error('Command registry must use HTTPS on raw.githubusercontent.com');
  }
  const response = await fetcher(parsed, { redirect: 'error', signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`Command registry request failed: HTTP ${response.status}`);
  const type = response.headers.get('content-type')?.split(';')[0]?.trim();
  if (!['application/json', 'text/plain'].includes(type) || !response.body)
    throw new Error('Command registry response is not JSON or plain text');
  const reader = response.body.getReader();
  const chunks = [];
  let bytes = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BYTES) {
        await reader.cancel();
        throw new Error('Command registry exceeds 1 MB');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return validateRegistry(JSON.parse(Buffer.concat(chunks).toString('utf8')));
}

export async function syncCommands({ url = DEFAULT_COMMANDS_URL, destination, fetcher = fetch } = {}) {
  const data = await fetchRegistry(url, fetcher);
  const output = destination ?? fileURLToPath(new URL('../src/data/commands.json', import.meta.url));
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  return data.count;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  syncCommands({ url: process.env.COMMANDS_URL ?? DEFAULT_COMMANDS_URL })
    .then((count) => console.log(`[sync:commands] synced ${count} commands from Bolt-OS`))
    .catch((error) => {
      console.error(`[sync:commands] ${error.message}`);
      process.exitCode = 1;
    });
}
