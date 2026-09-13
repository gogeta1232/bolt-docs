import { useSearchParams } from 'react-router';

import { CommandGrid } from '../features/commands/CommandGrid';
import { MODULES, commandData } from '../lib/commands/taxonomy';
import type { ModuleFilter } from '../lib/commands/types';

const VALID_MODULES = new Set<string>(MODULES.map((m) => m.id));

export function CommandsPage(): React.JSX.Element {
  const [params] = useSearchParams();
  const requested = params.get('module') ?? 'all';
  const initialModule: ModuleFilter = VALID_MODULES.has(requested) ? (requested as ModuleFilter) : 'all';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[52ch] text-left">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-(--bolt-action-strong) uppercase">
            Registry
          </p>
          <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-(--bolt-ink)">Commands</h1>
          <p className="mt-2 leading-relaxed text-(--bolt-muted)">
            Every command with slash and prefix usage, options and required permissions.
          </p>
        </div>
        <p className="inline-flex min-h-[32px] items-center rounded-full bg-(--bolt-surface-hover) px-3 py-1 font-mono text-[12px] text-(--bolt-muted)">
          {commandData.count} commands
        </p>
      </div>
      <div className="mt-6">
        <CommandGrid key={initialModule} initialModule={initialModule} />
      </div>
    </div>
  );
}
