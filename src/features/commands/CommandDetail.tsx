import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router';

import { Badge } from '../../components/ui/badge';
import { commandData, getCommand, subOf } from '../../lib/commands/taxonomy';
import { slashUsageOf } from '../../lib/commands/search';
import { CopyButton } from './CopyButton';

export function CommandDetailPage(): React.JSX.Element {
  const { name } = useParams();
  const cmd = name ? getCommand(name) : undefined;

  if (!cmd) return <Navigate to="/commands" replace />;

  const siblings = commandData.commands
    .filter((c) => c.module === cmd.module)
    .sort((a, b) => a.name.localeCompare(b.name));
  const at = siblings.findIndex((c) => c.name === cmd.name);
  const prev = at > 0 ? siblings[at - 1] : undefined;
  const next = at >= 0 && at < siblings.length - 1 ? siblings[at + 1] : undefined;
  const related = commandData.commands
    .filter((c) => c.name !== cmd.name && (c.module === cmd.module || subOf(c) === subOf(cmd)))
    .slice(0, 4);
  const slashUsage = slashUsageOf(cmd);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        to="/commands"
        className="bolt-fade inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-transparent px-1 text-sm font-semibold text-(--bolt-muted) hover:bg-(--bolt-surface-hover) hover:text-(--bolt-ink)"
      >
        <ArrowLeft size={16} aria-hidden /> All commands
      </Link>

      <div className="bolt-enter mt-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-mono text-3xl font-bold tracking-tight text-(--bolt-ink)">/{cmd.name}</h1>
          <Badge variant="accent">{subOf(cmd)}</Badge>
          {cmd.adminOnly ? <Badge variant="accent">admin only</Badge> : null}
        </div>
        <div className="bolt-headline-rule" aria-hidden="true" />
        <p className="mt-3 text-[17px] leading-relaxed text-(--bolt-muted)">{cmd.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge>{cmd.module}</Badge>
          {cmd.supportsSlash ? <Badge>slash</Badge> : null}
          {cmd.supportsPrefix ? <Badge>prefix</Badge> : null}
          {cmd.aliases.map((a) => (
            <Badge key={a}>aka {a}</Badge>
          ))}
        </div>
      </div>

      <section aria-label="Usage" className="mt-6 space-y-3">
        <UsageRow label="Prefix" text={cmd.prefixUsage} command={cmd.name} />
        <UsageRow label="Slash" text={slashUsage} command={cmd.name} />
      </section>

      {cmd.slashOptions.length > 0 ? (
        <section aria-label="Options" className="mt-8">
          <h2 className="font-display text-lg font-bold tracking-tight text-(--bolt-ink)">Options</h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-(--bolt-line) bg-(--bolt-surface)">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-(--bolt-line) bg-(--bolt-surface-hover)/60 text-xs tracking-[0.08em] text-(--bolt-faint) uppercase">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Option
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Required
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--bolt-line)">
                {cmd.slashOptions.map((o) => (
                  <tr key={o.name} className="hover:bg-(--bolt-surface-hover)/40">
                    <td className="px-4 py-3 font-mono text-[13px] font-medium text-(--bolt-ink)">{o.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-(--bolt-muted)">{o.type}</td>
                    <td className="px-4 py-3 text-(--bolt-muted)">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${o.required ? 'bg-(--bolt-attention) text-(--bolt-ink)' : 'bg-(--bolt-surface-hover) text-(--bolt-faint)'}`}
                      >
                        {o.required ? 'required' : 'optional'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm leading-relaxed text-(--bolt-muted)">{o.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {cmd.requiredClientPermissions.length > 0 ? (
        <section aria-label="Bot permissions" className="mt-6 rounded-xl border border-(--bolt-line) bg-(--bolt-surface) p-4">
          <h2 className="font-display text-sm font-bold tracking-tight text-(--bolt-ink)">Bot needs</h2>
          <p className="mt-1 font-mono text-sm text-(--bolt-muted)">{cmd.requiredClientPermissions.join(' · ')}</p>
          <p className="mt-1 text-xs leading-relaxed text-(--bolt-faint)">Checked in the channel before Bolt runs the command.</p>
        </section>
      ) : null}

      <p className="mt-6 font-mono text-xs tracking-wide text-(--bolt-faint)">Source: {cmd.file}</p>

      {related.length > 0 ? (
        <section aria-label="Related commands" className="mt-8">
          <h2 className="font-display text-base font-bold tracking-tight text-(--bolt-ink)">Related in {cmd.module}</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {related.map((r) => (
              <Link
                key={r.name}
                to={`/commands/${r.name}`}
                className="bolt-fade rounded-full border border-(--bolt-line) bg-(--bolt-surface) px-3 py-1.5 font-mono text-sm text-(--bolt-ink) hover:border-(--bolt-faint) hover:bg-(--bolt-surface-hover)"
              >
                /{r.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <nav aria-label="More in module" className="mt-8 grid gap-3 sm:grid-cols-2">
        {prev ? <Pager to={`/commands/${prev.name}`} label="Previous" name={prev.name} /> : <span />}
        {next ? <Pager to={`/commands/${next.name}`} label="Next" name={next.name} align="end" /> : <span />}
      </nav>
    </div>
  );
}

function UsageRow({ label, text, command }: { label: string; text: string; command: string }): React.JSX.Element {
  return (
    <div className="group flex items-center justify-between gap-3 rounded-xl border border-(--bolt-line) bg-(--bolt-surface) p-3 transition-colors hover:border-(--bolt-faint)">
      <div className="min-w-0">
        <p className="font-mono text-[11px] font-medium tracking-[0.12em] text-(--bolt-faint) uppercase">{label}</p>
        <code className="mt-0.5 block font-mono text-sm break-all text-(--bolt-ink)">{text}</code>
      </div>
      <CopyButton text={text} label={`Copy ${label.toLowerCase()} usage for ${command}`} />
    </div>
  );
}

function Pager({
  to,
  label,
  name,
  align
}: {
  to: string;
  label: string;
  name: string;
  align?: 'end';
}): React.JSX.Element {
  return (
    <Link
      to={to}
      className={`bolt-fade flex min-h-[44px] items-center gap-2 rounded-xl border border-(--bolt-line) bg-(--bolt-surface) px-4 py-2.5 text-sm transition-colors hover:border-(--bolt-faint) hover:bg-(--bolt-surface-hover) ${align === 'end' ? 'justify-end text-right' : ''}`}
    >
      {align !== 'end' ? <ArrowLeft size={16} aria-hidden className="shrink-0 text-(--bolt-faint)" /> : null}
      <span>
        <span className="block font-mono text-xs tracking-wide text-(--bolt-faint)">{label}</span>
        <span className="block font-mono text-sm font-semibold tracking-tight text-(--bolt-ink)">/{name}</span>
      </span>
      {align === 'end' ? <ArrowRight size={16} aria-hidden className="shrink-0 text-(--bolt-faint)" /> : null}
    </Link>
  );
}
