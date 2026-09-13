import { RotateCcw } from 'lucide-react';
import type { RefObject } from 'react';

import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { SearchInput, Select } from '../../components/ui/input';
import { cn } from '../../components/ui/utils';
import { MODULES } from '../../lib/commands/taxonomy';
import type { ModuleFilter } from '../../lib/commands/types';

export function FilterBar({
  query,
  onQuery,
  module,
  onModule,
  sub,
  onSub,
  subs,
  counts,
  shown,
  total,
  onReset,
  searchRef
}: {
  query: string;
  onQuery: (v: string) => void;
  module: ModuleFilter;
  onModule: (v: ModuleFilter) => void;
  sub: string;
  onSub: (v: string) => void;
  subs: string[];
  counts: Record<string, number>;
  shown: number;
  total: number;
  onReset: () => void;
  searchRef: RefObject<HTMLInputElement | null>;
}): React.JSX.Element {
  const filtering = query.trim().length > 0 || module !== 'all' || sub !== 'all';

  return (
    <div>
      <div className="grid gap-2 lg:grid-cols-[1fr_auto]">
        <SearchInput
          ref={searchRef}
          label="Search commands (press / to focus)"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search name, description, alias…  ( / )"
          type="search"
          autoComplete="off"
        />
        <Select label="Filter by group" value={sub} onChange={(e) => onSub(e.target.value)}>
          {subs.map((s) => (
            <option key={s} value={s}>
              {s === 'all' ? 'All groups' : s}
            </option>
          ))}
        </Select>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {(['all', ...MODULES.map((m) => m.id)] as ModuleFilter[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onModule(m)}
            aria-pressed={module === m}
            className={cn('bolt-module-pill', module === m && 'is-active')}
          >
            {m === 'all' ? 'All' : MODULES.find((mod) => mod.id === m)?.label}
            <span className="bolt-module-count">{m === 'all' ? total : (counts[m] ?? 0)}</span>
          </button>
        ))}
        <span className="ms-auto" />
        <Badge variant="accent" aria-live="polite">
          {shown} of {total}
        </Badge>
        {filtering ? (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <RotateCcw size={14} aria-hidden /> Reset
          </Button>
        ) : null}
      </div>
    </div>
  );
}
