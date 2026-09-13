import { subOf } from './taxonomy';
import type { DocCommand } from './types';

export function matches(cmd: DocCommand, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return true;
  return (
    cmd.name.toLowerCase().includes(q) ||
    cmd.description.toLowerCase().includes(q) ||
    cmd.aliases.some((a) => a.toLowerCase().includes(q)) ||
    subOf(cmd).toLowerCase().includes(q) ||
    cmd.module.toLowerCase().includes(q)
  );
}

export function slashUsageOf(cmd: DocCommand): string {
  if (cmd.slashOptions.length === 0) return `/${cmd.name}`;
  const args = cmd.slashOptions.map((o) => (o.required ? `<${o.name}>` : `[${o.name}]`)).join(' ');
  return `/${cmd.name} ${args}`;
}

export function timeAgo(iso: string): string {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export interface PaletteItem {
  kind: 'command' | 'guide' | 'page';
  title: string;
  hint: string;
  path: string;
  copyText?: string;
  score: number;
}

/** Tiny ranked fuzzy match: name-start > word-start > substring > description. */
export function rankMatch(haystack: string, query: string): number {
  const h = haystack.toLowerCase();
  const q = query.trim().toLowerCase();
  if (q.length === 0) return 1;
  if (h === q) return 100;
  if (h.startsWith(q)) return 80;
  const words = h.split(/[^a-z0-9]+/);
  if (words.some((w) => w.startsWith(q))) return 60;
  if (h.includes(q)) return 40;
  // Fuzzy: all query chars in order.
  let qi = 0;
  for (const ch of h) {
    if (ch === q[qi]) qi += 1;
    if (qi >= q.length) return 20;
  }
  return 0;
}
