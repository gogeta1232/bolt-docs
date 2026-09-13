import { ArrowRight, ArrowUpRight, BookOpen, ShieldCheck, TerminalSquare } from 'lucide-react';
import { Link } from 'react-router';

import { DiscordProfileCard } from '../components/profile/DiscordProfileCard';
import { Badge } from '../components/ui/badge';
import { buttonVariants } from '../components/ui/button-variants';
import { cn } from '../components/ui/utils';
import { MODULES, commandData } from '../lib/commands/taxonomy';
import { GUIDES } from '../lib/guides';

const LADDER = ['Warn', 'Mute', 'Timeout', 'Kick', 'Ban'];

export function HomePage(): React.JSX.Element {
  const modules = new Set(commandData.commands.map((c) => c.module)).size;

  return (
    <div>
      {/* Hero: asymmetric 12-col, left-aligned. Profile card owns the banner. */}
      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 pt-10 pb-10 md:pt-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="bolt-enter inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex min-h-[32px] items-center gap-2 rounded-full border border-(--bolt-line) bg-(--bolt-surface) px-3 py-1 text-[13px] font-medium text-(--bolt-muted)">
              <span className="size-2 shrink-0 rounded-full bg-green-500" aria-hidden="true" />
              Online · Slash + prefix
            </span>
            <span className="inline-flex min-h-[32px] items-center rounded-full bg-(--bolt-surface-hover) px-3 py-1 font-mono text-[12px] text-(--bolt-muted)">
              {commandData.defaultPrefix}help
            </span>
          </p>

          <p
            className="bolt-enter mt-5 font-mono text-xs font-medium tracking-[0.18em] text-(--bolt-action-strong) uppercase"
            style={{ animationDelay: '40ms' }}
          >
            Bolt — Discord moderation bot
          </p>
          <h1
            className="bolt-enter mt-2 font-display text-[2.75rem] leading-[1.02] font-bold tracking-tight text-balance text-(--bolt-ink) md:text-6xl"
            style={{ animationDelay: '80ms' }}
          >
            Calm moderation.
            <br />
            Sharp defaults.
          </h1>
          <p
            className="bolt-enter mt-4 max-w-[52ch] text-lg leading-relaxed text-(--bolt-muted)"
            style={{ animationDelay: '120ms' }}
          >
            Warn, restrain, remove — every step rechecks membership, roles and hierarchy at execution time and writes a
            numbered case with evidence.
          </p>

          <div className="bolt-enter mt-6 flex flex-wrap items-center gap-3" style={{ animationDelay: '160ms' }}>
            <Link
              to="/commands"
              className={cn(
                buttonVariants({ variant: 'primary', size: 'md' }),
                'group h-13 rounded-full px-7 text-[15px]'
              )}
            >
              Browse commands
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/guides/getting-started"
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'md' }),
                'group h-13 rounded-full px-7 text-[15px]'
              )}
            >
              <BookOpen size={18} aria-hidden="true" /> Get started
            </Link>
          </div>

          <dl
            className="bolt-enter mt-8 grid max-w-md grid-cols-3 divide-x divide-(--bolt-line) border-y border-(--bolt-line)"
            style={{ animationDelay: '200ms' }}
          >
            <Stat value={String(commandData.count)} label="Commands" />
            <Stat value={String(modules)} label="Modules" />
            <Stat value={String(GUIDES.length)} label="Guides" />
          </dl>

          <figure
            className="bolt-enter mt-6 overflow-hidden rounded-xl border border-(--bolt-line) bg-(--bolt-surface)"
            style={{ animationDelay: '240ms' }}
            aria-label="Example moderation command"
          >
            <figcaption className="flex items-center gap-2 border-b border-(--bolt-line) px-4 py-2.5 text-[13px] font-medium text-(--bolt-muted)">
              <TerminalSquare size={16} aria-hidden="true" className="text-(--bolt-action-strong)" />
              Try it in your server
            </figcaption>
            <div className="space-y-1.5 px-4 py-3.5 font-mono text-[13px] leading-6">
              <p className="text-(--bolt-ink)">
                <span className="text-(--bolt-faint)">!</span>warn @rini spam
              </p>
              <p className="text-(--bolt-muted)">
                <span className="text-green-600">✓</span> case #42 written · evidence attached · /cases @rini
              </p>
            </div>
          </figure>
        </div>

        <div className="lg:col-span-5">
          <div className="max-w-[360px]">
            <DiscordProfileCard />
          </div>
          <p className="mt-4 font-mono text-[11px] tracking-wider text-(--bolt-faint) uppercase">
            Free · Self-hosted · No signup
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10" aria-label="Command modules">
        <SectionHeading
          eyebrow="Registry"
          title="What Bolt can do"
          copy={`${commandData.count} commands across ${modules} modules. Pick a lane.`}
          linkTo="/commands"
          linkLabel="Open registry"
        />
        <div className="mt-2 border-b border-(--bolt-line)">
          {MODULES.map((m, i) => (
            <Link
              key={m.id}
              to={`/commands?module=${m.id}`}
              className="bolt-enter group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 border-t border-(--bolt-line) py-5 outline-none lg:grid-cols-[64px_220px_1fr_auto]"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="font-mono text-xs text-(--bolt-action-strong)">0{i + 1}</span>
              <span className="font-display text-xl font-bold tracking-tight text-(--bolt-ink)">{m.label}</span>
              <span className="col-span-3 text-[15px] leading-relaxed text-(--bolt-muted) lg:col-span-1">
                {m.blurb}
              </span>
              <span className="col-start-3 row-start-1 inline-flex items-center gap-2 justify-self-end font-mono text-[12px] text-(--bolt-muted) lg:col-start-4 lg:row-start-auto">
                {commandData.commands.filter((c) => c.module === m.id).length} cmds
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="text-(--bolt-action-strong) transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-(--bolt-line) bg-(--bolt-surface)" aria-label="Moderation ladder">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <SectionHeading
            eyebrow="Workflow"
            title="Warn, restrain, remove"
            copy="Escalation with receipts. Authority is rechecked when the action runs, not when the menu opened."
            linkTo="/guides/moderation-workflow"
            linkLabel="Read the workflow"
          />
          <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-(--bolt-line) bg-(--bolt-line) sm:grid-cols-3 lg:grid-cols-5">
            {LADDER.map((step, i) => (
              <li key={step} className="bolt-enter bg-(--bolt-bg) p-5" style={{ animationDelay: `${i * 50}ms` }}>
                <p className="font-mono text-xs text-(--bolt-action-strong)">0{i + 1}</p>
                <p className="mt-1 font-display text-[17px] font-bold text-(--bolt-ink)">{step}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-(--bolt-muted)">
                  {i < 2 ? 'Logged with reason.' : i < 4 ? 'Hierarchy checked.' : 'Evidence attached.'}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10" aria-label="Why Bolt">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                eyebrow="Design"
                title="Sharp defaults, calm under pressure"
                copy="Three guarantees. Everything else is in the guides."
                linkTo="/guides"
                linkLabel="All guides"
              />
            </div>
          </div>
          <div className="divide-y divide-(--bolt-line) border-y border-(--bolt-line) lg:col-span-8">
            <div className="flex gap-4 py-5">
              <ShieldCheck size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-(--bolt-action-strong)" />
              <div>
                <h3 className="font-display text-lg font-bold text-(--bolt-ink)">Current permissions</h3>
                <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-(--bolt-muted)">
                  Every action rechecks membership, configured roles and hierarchy at execution time.
                </p>
              </div>
            </div>
            <div className="flex gap-4 py-5">
              <p
                className="w-5 shrink-0 text-center font-mono text-xl font-medium text-(--bolt-action-strong)"
                aria-hidden="true"
              >
                /
              </p>
              <div>
                <h3 className="font-display text-lg font-bold text-(--bolt-ink)">Slash + prefix</h3>
                <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-(--bolt-muted)">
                  Slash for discoverability, prefix for speed. Per-server prefix via{' '}
                  <code className="font-mono">/setprefix</code>.
                </p>
              </div>
            </div>
            <div className="flex gap-4 py-5">
              <p
                className="w-5 shrink-0 text-center font-display text-xl font-bold text-(--bolt-ink)"
                aria-hidden="true"
              >
                {GUIDES.length}
              </p>
              <div>
                <h3 className="font-display text-lg font-bold text-(--bolt-ink)">Guides from source</h3>
                <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-(--bolt-muted)">
                  Setup, permissions, workflows and internals — written from the code, not marketing.
                </p>
                <p className="mt-3">
                  <Badge variant="accent">{commandData.defaultPrefix}prefix supported everywhere</Badge>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }): React.JSX.Element {
  return (
    <div className="px-4 py-3 text-left first:pl-0">
      <dd className="font-display text-2xl font-bold text-(--bolt-ink) tabular-nums">{value}</dd>
      <dt className="mt-0.5 text-[11px] font-medium tracking-[0.14em] text-(--bolt-faint) uppercase">{label}</dt>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  linkTo,
  linkLabel
}: {
  eyebrow: string;
  title: string;
  copy: string;
  linkTo: string;
  linkLabel: string;
}): React.JSX.Element {
  return (
    <div className="max-w-[60ch] text-left">
      <p className="font-mono text-xs font-medium tracking-[0.18em] text-(--bolt-action-strong) uppercase">{eyebrow}</p>
      <h2 className="mt-1 font-display text-[1.75rem] leading-tight font-bold tracking-tight text-(--bolt-ink)">
        {title}
      </h2>
      <p className="mt-1.5 text-[15px] leading-relaxed text-(--bolt-muted)">{copy}</p>
      <p className="mt-3">
        <Link
          to={linkTo}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-(--bolt-action-strong)"
        >
          {linkLabel}
          <ArrowRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </p>
    </div>
  );
}
