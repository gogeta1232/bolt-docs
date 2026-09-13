import { ArrowRight, BookOpen, Check, Copy, FileText, House } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { commandData, getCommand } from '../../lib/commands/taxonomy';
import { rankMatch, slashUsageOf } from '../../lib/commands/search';
import { GUIDES } from '../../lib/guides';
import { cn } from '../ui/utils';

interface Entry {
  key: string;
  icon: 'command' | 'guide' | 'page';
  title: string;
  hint: string;
  path: string;
  copyText?: string;
}

const PAGES: Entry[] = [
  { key: 'page-home', icon: 'page', title: 'Home', hint: 'Overview and stats', path: '/' },
  { key: 'page-commands', icon: 'page', title: 'All commands', hint: 'Browse the registry', path: '/commands' },
  { key: 'page-guides', icon: 'page', title: 'Guides', hint: 'Setup and workflows', path: '/guides' },
  { key: 'page-how', icon: 'page', title: 'How Bolt works', hint: 'Internals', path: '/how-it-works' }
];

const RECENT_KEY = 'bolt-site-recent';

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string').slice(0, 5) : [];
  } catch {
    return [];
  }
}

function Icon({ icon }: { icon: Entry['icon'] }): React.JSX.Element {
  const props = { size: 16, 'aria-hidden': true } as const;
  if (icon === 'command') return <span className="font-mono text-sm text-(--bolt-action-strong)">/</span>;
  if (icon === 'guide') return <BookOpen {...props} />;
  return <FileText {...props} />;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }): React.JSX.Element | null {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(t);
    };
  }, [open]);

  const entries = useMemo<Entry[]>(() => {
    const q = query.trim();
    const scored: (Entry & { score: number })[] = [];
    for (const cmd of commandData.commands) {
      const score = Math.max(
        rankMatch(cmd.name, q),
        rankMatch(cmd.aliases.join(' '), q),
        q ? rankMatch(cmd.description, q) * 0.6 : 1
      );
      if (score > 0) {
        scored.push({
          key: `cmd-${cmd.name}`,
          icon: 'command',
          title: `/${cmd.name}`,
          hint: cmd.description,
          path: `/commands/${cmd.name}`,
          copyText: slashUsageOf(cmd),
          score: score + 5
        });
      }
    }
    for (const g of GUIDES) {
      const score = Math.max(rankMatch(g.title, q), q ? rankMatch(g.description, q) * 0.6 : 1);
      if (score > 0) {
        scored.push({
          key: `guide-${g.slug}`,
          icon: 'guide',
          title: g.title,
          hint: g.description,
          path: `/guides/${g.slug}`,
          score
        });
      }
    }
    if (q.length === 0) {
      const recent = loadRecent();
      const recentEntries: (Entry & { score: number })[] = [];
      for (const name of recent) {
        const cmd = getCommand(name);
        if (!cmd) continue;
        recentEntries.push({
          key: `cmd-${cmd.name}`,
          icon: 'command',
          title: `/${cmd.name}`,
          hint: cmd.description,
          path: `/commands/${cmd.name}`,
          copyText: slashUsageOf(cmd),
          score: 200
        });
      }
      return [...recentEntries, ...PAGES.map((p) => ({ ...p, score: 100 })), ...scored];
    }
    return scored.sort((a, b) => b.score - a.score).slice(0, 12);
  }, [query]);

  const [seenLen, setSeenLen] = useState(entries.length);
  if (seenLen !== entries.length) {
    setSeenLen(entries.length);
    setActive(0);
  }

  const go = (entry: Entry): void => {
    if (entry.key.startsWith('cmd-')) {
      try {
        const recent = [entry.title.slice(1), ...loadRecent().filter((n) => n !== entry.title.slice(1))].slice(0, 5);
        localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
      } catch {
        /* private mode: skip */
      }
    }
    onClose();
    navigate(entry.path);
  };

  const copyUsage = (entry: Entry): void => {
    if (!entry.copyText) return;
    const done = (): void => {
      setCopiedKey(entry.key);
      window.setTimeout(() => setCopiedKey((k) => (k === entry.key ? null : k)), 1200);
    };
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(entry.copyText).then(done).catch(done);
    } else {
      done();
    }
  };

  if (!open) return null;
  const current = entries[active];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[12vh]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search commands and guides"
        className="bolt-pop w-full max-w-xl overflow-hidden rounded-2xl border border-(--bolt-line) bg-(--bolt-surface) shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-(--bolt-line) px-4">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, entries.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                if (current) go(current);
              } else if (e.key === 'Escape') {
                onClose();
              }
            }}
            placeholder="Search commands, guides…"
            aria-label="Search commands and guides"
            autoComplete="off"
            className="h-14 w-full bg-transparent text-[15px] text-(--bolt-ink) outline-none placeholder:text-(--bolt-faint)"
          />
          <kbd className="shrink-0 rounded-md border border-(--bolt-line) bg-(--bolt-surface-hover) px-1.5 py-0.5 font-mono text-[11px] text-(--bolt-faint)">
            esc
          </kbd>
        </div>
        <div ref={listRef} role="listbox" aria-label="Results" className="max-h-[40vh] overflow-y-auto p-2">
          {entries.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-(--bolt-muted)" role="status">
              Nothing found. Try a command name, alias or topic.
            </p>
          ) : (
            entries.map((entry, i) => (
              <div
                key={entry.key}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => go(entry)}
                className={cn(
                  'bolt-fade flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5',
                  i === active && 'bg-(--bolt-surface-hover)'
                )}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-(--bolt-line) text-(--bolt-muted)">
                  <Icon icon={entry.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-(--bolt-ink)">{entry.title}</span>
                  <span className="block truncate text-xs text-(--bolt-faint)">{entry.hint}</span>
                </span>
                {entry.copyText ? (
                  <button
                    type="button"
                    aria-label={`Copy usage for ${entry.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      copyUsage(entry);
                    }}
                    className="bolt-fade inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-(--bolt-faint) hover:bg-(--bolt-action-soft) hover:text-(--bolt-action-strong)"
                  >
                    {copiedKey === entry.key ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
                  </button>
                ) : null}
                <ArrowRight size={15} aria-hidden className="shrink-0 text-(--bolt-faint)" />
              </div>
            ))
          )}
        </div>
        <div className="flex items-center gap-4 border-t border-(--bolt-line) px-4 py-2.5 text-xs text-(--bolt-faint)">
          <span>
            <Hint>↑↓</Hint> navigate
          </span>
          <span>
            <Hint>↵</Hint> open
          </span>
          <span className="ms-auto">
            <House size={12} aria-hidden className="me-1 inline" /> {commandData.count} commands indexed
          </span>
        </div>
      </div>
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <kbd className="me-1 rounded-md border border-(--bolt-line) bg-(--bolt-surface-hover) px-1.5 py-0.5 font-mono text-[11px]">
      {children}
    </kbd>
  );
}
