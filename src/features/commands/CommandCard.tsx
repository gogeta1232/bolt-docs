import { ArrowUpRight, Lock } from 'lucide-react';
import { Link } from 'react-router';

import { subOf } from '../../lib/commands/taxonomy';
import type { DocCommand } from '../../lib/commands/types';

function interfaceToken(cmd: DocCommand): string {
  if (cmd.supportsSlash && cmd.supportsPrefix) return 'slash + prefix';
  if (cmd.supportsSlash) return 'slash only';
  return 'prefix only';
}

export function CommandCard({ cmd, index }: { cmd: DocCommand; index: number }): React.JSX.Element {
  const entranceDelay = `${Math.min(index, 11) * 35}ms`;
  return (
    <Link
      to={`/commands/${cmd.name}`}
      className="bolt-enter bolt-lift bolt-fade group relative block overflow-hidden rounded-xl border border-(--bolt-line) bg-(--bolt-surface) p-4 shadow-[var(--bolt-shadow)] outline-none hover:border-(--bolt-faint) hover:shadow-md"
      style={{ animationDelay: entranceDelay }}
      aria-label={`/${cmd.name} — ${cmd.description}`}
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-(--bolt-attention) transition-transform duration-200 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-(--bolt-faint) uppercase">
          {cmd.module} · {subOf(cmd)}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {cmd.adminOnly ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-(--bolt-action-soft) px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide text-(--bolt-action-strong)">
              <Lock size={11} aria-hidden />
              admin
            </span>
          ) : null}
          <span className="font-mono text-[11px] tracking-wide text-(--bolt-muted)">{interfaceToken(cmd)}</span>
        </div>
      </div>
      <div className="mt-2 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-mono text-[16px] font-bold tracking-tight text-(--bolt-ink)">/{cmd.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-(--bolt-muted)">{cmd.description}</p>
        </div>
        <ArrowUpRight
          size={18}
          aria-hidden
          className="mt-1 shrink-0 text-(--bolt-faint) transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--bolt-action-strong)"
        />
      </div>
    </Link>
  );
}
