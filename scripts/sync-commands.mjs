#!/usr/bin/env node
// Fetch latest commands.json from Bolt-OS and update local copy.
// Used by CI and manual `npm run sync:commands`.

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dest = join(__dirname, '../src/data/commands.json');
const url = process.env.COMMANDS_URL ?? 'https://raw.githubusercontent.com/gogeta1232/Bolt-OS/main/site/src/data/commands.json';

console.log(`[sync:commands] fetching ${url}`);
const res = await fetch(url);
if (!res.ok) {
  console.error(`[sync:commands] failed ${res.status} ${res.statusText} for ${url}`);
  console.error('Expected Bolt-OS to have site/src/data/commands.json committed. Push Bolt-OS first.');
  process.exit(1);
}
const json = await res.text();
// Validate JSON before writing
try {
  JSON.parse(json);
} catch (e) {
  console.error('[sync:commands] invalid JSON', e);
  process.exit(1);
}
await mkdir(dirname(dest), { recursive: true });
await writeFile(dest, json + '\n', 'utf8');
console.log(`[sync:commands] wrote ${dest} (${json.length} bytes)`);
