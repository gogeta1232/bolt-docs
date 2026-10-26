import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import { DEFAULT_COMMANDS_URL, fetchRegistry, syncCommands, validateRegistry } from './sync-commands.mjs';

const registry = {
  count: 1,
  defaultPrefix: '!',
  commands: [
    {
      name: 'ping',
      description: 'Check latency',
      module: 'utility',
      aliases: [],
      supportsSlash: true,
      supportsPrefix: true
    }
  ]
};
const response = () => new Response(JSON.stringify(registry), { headers: { 'content-type': 'text/plain' } });

test('uses the public source and bounds fetches without following redirects', async () => {
  assert.match(DEFAULT_COMMANDS_URL, /gogeta1232\/Bolt-OS\/main/);
  const data = await fetchRegistry(DEFAULT_COMMANDS_URL, async (url, options) => {
    assert.equal(String(url), DEFAULT_COMMANDS_URL);
    assert.equal(options.redirect, 'error');
    assert.ok(options.signal instanceof AbortSignal);
    return response();
  });
  assert.deepEqual(data, registry);
});

test('rejects insecure or untrusted sources before making a request', async () => {
  const unexpected = () => {
    throw new Error('Unexpected network access');
  };
  for (const url of [
    'http://raw.githubusercontent.com/file',
    'https://example.com/file',
    'https://raw.githubusercontent.com:444/file'
  ]) {
    await assert.rejects(fetchRegistry(url, unexpected), /must use HTTPS/);
  }
});

test('rejects mismatched counts and duplicate command entries', () => {
  assert.throws(() => validateRegistry({ ...registry, count: 2 }), /Invalid command registry/);
  assert.throws(
    () => validateRegistry({ ...registry, count: 2, commands: [...registry.commands, ...registry.commands] }),
    /Invalid command entry/
  );
});

test('rejects error responses, HTML and oversized streaming bodies', async () => {
  await assert.rejects(
    fetchRegistry(DEFAULT_COMMANDS_URL, async () => new Response(null, { status: 404 })),
    /HTTP 404/
  );
  await assert.rejects(
    fetchRegistry(
      DEFAULT_COMMANDS_URL,
      async () => new Response('<html>', { headers: { 'content-type': 'text/html' } })
    ),
    /not JSON/
  );
  await assert.rejects(
    fetchRegistry(
      DEFAULT_COMMANDS_URL,
      async () => new Response('x'.repeat(1_000_001), { headers: { 'content-type': 'text/plain' } })
    ),
    /exceeds 1 MB/
  );
});

test('writes canonical JSON and preserves existing data when validation fails', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'bolt-docs-sync-'));
  try {
    const destination = join(directory, 'commands.json');
    await writeFile(destination, 'original');
    await assert.rejects(
      syncCommands({
        destination,
        fetcher: async () => new Response('{}', { headers: { 'content-type': 'text/plain' } })
      })
    );
    assert.equal(await readFile(destination, 'utf8'), 'original');
    assert.equal(await syncCommands({ destination, fetcher: response }), 1);
    assert.equal(await readFile(destination, 'utf8'), `${JSON.stringify(registry, null, 2)}\n`);
  } finally {
    // mkdtemp creates the test-owned directory under the OS temporary directory.
    assert.equal(directory.startsWith(join(tmpdir(), 'bolt-docs-sync-')), true);
    await rm(directory, { recursive: true, force: true });
  }
});
