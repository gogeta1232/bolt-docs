import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';

import { commandData } from '../../lib/commands/taxonomy';
import { groupCommands, subOf } from '../../lib/commands/taxonomy';
import type { ModuleFilter } from '../../lib/commands/types';
import { matches, timeAgo } from '../../lib/commands/search';
import { CommandCard } from './CommandCard';
import { FilterBar } from './FilterBar';

export function CommandGrid({ initialModule = 'all' }: { initialModule?: ModuleFilter }): React.JSX.Element {
  const { commands, generatedAt, count, defaultPrefix } = commandData;
  const [query, setQuery] = useState('');
  const [module, setModule] = useState<ModuleFilter>(initialModule);
  const [sub, setSub] = useState<string>('all');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const deferredQuery = useDeferredValue(query);
  const filtering = deferredQuery.trim().length > 0 || module !== 'all' || sub !== 'all';

  // Press / anywhere outside a field to jump to search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA'))
        return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const c of commands) out[c.module] = (out[c.module] ?? 0) + 1;
    return out;
  }, [commands]);

  const subs = useMemo(() => {
    const inModule = module === 'all' ? commands : commands.filter((c) => c.module.toLowerCase() === module);
    return ['all', ...Array.from(new Set(inModule.map(subOf))).sort((a, b) => a.localeCompare(b))];
  }, [commands, module]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return commands
      .filter((c) => (module === 'all' ? true : c.module.toLowerCase() === module))
      .filter((c) => (sub === 'all' ? true : subOf(c) === sub))
      .filter((c) => matches(c, q))
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [commands, deferredQuery, module, sub]);

  const groups = useMemo(() => groupCommands(filtered), [filtered]);

  const reset = (): void => {
    setQuery('');
    setModule('all');
    setSub('all');
  };

  return (
    <section aria-label="Command browser">
      <p className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs tracking-wide text-(--bolt-faint)">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-green-500" aria-hidden="true" />
          Updated {timeAgo(generatedAt)}
        </span>
        <span aria-hidden="true">·</span>
        <span>
          default prefix <code className="rounded bg-(--bolt-surface-hover) px-1.5 py-0.5 font-mono text-xs">{defaultPrefix}</code> per-server
        </span>
      </p>
      <div className="bolt-sticky-bar">
        <FilterBar
          query={query}
          onQuery={setQuery}
          module={module}
          onModule={(v) => {
            setModule(v);
            setSub('all');
          }}
          sub={sub}
          onSub={setSub}
          subs={subs}
          counts={counts}
          shown={filtered.length}
          total={count}
          onReset={reset}
          searchRef={searchRef}
        />
      </div>
      {filtered.length === 0 ? (
        <div className="mt-3 rounded-xl border border-(--bolt-line) bg-(--bolt-surface) p-6 text-center" role="status">
          <p className="font-semibold text-(--bolt-ink)">No commands match</p>
          <p className="mt-1 text-sm text-(--bolt-muted)">Try a name, alias, group or module.</p>
          <p className="mt-3">
            <button
              type="button"
              onClick={reset}
              className="bolt-fade inline-flex min-h-[44px] cursor-pointer items-center rounded-xl border border-(--bolt-line) bg-(--bolt-surface) px-4 text-sm font-semibold text-(--bolt-ink) hover:bg-(--bolt-surface-hover)"
            >
              Clear search and filters
            </button>
          </p>
        </div>
      ) : filtering ? (
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {filtered.map((cmd, i) => (
            <CommandCard key={cmd.name} cmd={cmd} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-3 space-y-9">
          {groups.map((g) => (
            <section key={`${g.module}/${g.sub}`} aria-label={`${g.module} ${g.sub}`}>
              <div className="mb-3 flex items-center gap-3">
                <span className="size-1.5 shrink-0 rounded-full bg-(--bolt-attention)" aria-hidden="true" />
                <h2 className="shrink-0 font-display text-[1.05rem] font-bold tracking-tight text-(--bolt-ink)">{g.sub}</h2>
                <span className="shrink-0 rounded-full border border-(--bolt-line) bg-(--bolt-surface) px-2 py-0.5 font-mono text-[11px] font-medium text-(--bolt-muted)">
                  {g.commands.length}
                </span>
                <span className="h-px min-w-4 flex-1 bg-(--bolt-line)" aria-hidden="true" />
                <span className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-(--bolt-faint) uppercase">{g.module}</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {g.commands.map((cmd, i) => (
                  <CommandCard key={cmd.name} cmd={cmd} index={i} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
