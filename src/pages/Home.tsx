import { ArrowRight, ArrowUpRight, BookOpen, ShieldCheck, TerminalSquare } from 'lucide-react';
import { Link } from 'react-router';

import { DiscordProfileCard } from '../components/profile/DiscordProfileCard';
import { Badge } from '../components/ui/badge';
import { buttonVariants } from '../components/ui/button-variants';
import { cn } from '../components/ui/utils';
import { MODULES, commandData } from '../lib/commands/taxonomy';
import { GUIDES } from '../lib/guides';

const LADDER = [
  { label: 'Warn', detail: 'Writes a numbered case.' },
  { label: 'Mute', detail: 'Holds the channel, logs reason.' },
  { label: 'Timeout', detail: 'Rechecks hierarchy live.' },
  { label: 'Kick', detail: 'Removes, keeps evidence.' },
  { label: 'Ban', detail: 'Blocks and files the case.' }
];

export function HomePage(): React.JSX.Element {
  const modules = new Set(commandData.commands.map((c) => c.module)).size;

  return (
    <div>
      {/* Hero: asymmetric 12-col — spec plate is the inventory tag for a moderation machine. */}
      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 pt-10 pb-10 md:pt-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="bolt-enter inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex min-h-[32px] items-center gap-2 rounded-full border border-(--bolt-line) bg-(--bolt-surface) px-3 py-1 text-[13px] font-medium text-(--bolt-muted)">
              <span className="size-2 shrink-0 rounded-full bg-green-500" aria-hidden="true" />
              Online
            </span>
            <span className="inline-flex min-h-[32px] items-center rounded-full bg-(--bolt-surface-hover) px-3 py-1 font-mono text-[12px] text-(--bolt-muted)">
              {commandData.defaultPrefix}help · slash + prefix
            </span>
          </p>

          <p
            className="bolt-enter mt-5 font-mono text-xs font-medium tracking-[0.18em] text-(--bolt-action-strong) uppercase"
            style={{ animationDelay: '40ms' }}
          >
            Bolt — Discord moderation bot
          </p>
          <h1
            className="bolt-enter mt-2 font-display text-[2.7rem] leading-[0.98] font-bold tracking-[-0.03em] text-balance text-(--bolt-ink) md:text-[3.75rem]"
            style={{ animationDelay: '80ms' }}
          >
            Calm moderation.
            <br />
            Sharp defaults.
          </h1>
          <div className="bolt-enter bolt-headline-rule" style={{ animationDelay: '100ms' }} aria-hidden="true" />
          <p
            className="bolt-enter mt-4 max-w-[50ch] text-[17px] leading-relaxed text-(--bolt-muted)"
            style={{ animationDelay: '120ms' }}
          >
            Warn, mute, timeout, kick or ban — Bolt rechecks roles and hierarchy when the action runs and files a
            numbered case with evidence.
          </p>

          <div className="bolt-enter mt-6 flex flex-wrap items-center gap-3" style={{ animationDelay: '160ms' }}>
            <Link
              to="/commands"
              className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'group h-13 rounded-full px-7 text-[15px]')}
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

          {/* Stamped spec plate — single source for inventory. Replaces big-number hero. */}
          <div
            className="bolt-enter bolt-spec-plate mt-8"
            style={{ animationDelay: '200ms' }}
            aria-label={`Bolt spec: ${commandData.count} commands, ${modules} modules, ${GUIDES.length} guides`}
          >
            <span className="bolt-spec-rivet tl" aria-hidden="true" />
            <span className="bolt-spec-rivet tr" aria-hidden="true" />
            <span className="bolt-spec-rivet bl" aria-hidden="true" />
            <span className="bolt-spec-rivet br" aria-hidden="true" />
            <div className="bolt-spec-cell">
              <span className="bolt-spec-kicker">Commands</span>
              <span className="bolt-spec-value">{commandData.count}</span>
              <span className="bolt-spec-meta">each writes a case</span>
            </div>
            <div className="bolt-spec-cell">
              <span className="bolt-spec-kicker">Modules</span>
              <span className="bolt-spec-value">{modules}</span>
              <span className="bolt-spec-meta">moderation → permissions</span>
            </div>
            <div className="bolt-spec-cell">
              <span className="bolt-spec-kicker">Guides</span>
              <span className="bolt-spec-value">{GUIDES.length}</span>
              <span className="bolt-spec-meta">written from source</span>
            </div>
          </div>

          <figure
            className="bolt-enter mt-6 overflow-hidden rounded-xl border border-(--bolt-line) bg-(--bolt-surface)"
            style={{ animationDelay: '240ms' }}
            aria-label="Example moderation command"
          >
            <figcaption className="flex items-center gap-2 border-b border-(--bolt-line) bg-(--bolt-surface-hover)/60 px-4 py-2.5 text-[13px] font-medium text-(--bolt-muted)">
              <TerminalSquare size={16} aria-hidden="true" className="text-(--bolt-action-strong)" />
              Try it in your server
              <span className="ms-auto font-mono text-[11px] tracking-wide text-(--bolt-faint) uppercase">Evidence logged</span>
            </figcaption>
            <div className="space-y-1.5 px-4 py-3.5 font-mono text-[13px] leading-6">
              <p className="text-(--bolt-ink)">
                <span className="text-(--bolt-faint)">!</span>warn @rini spam
              </p>
              <p className="text-(--bolt-muted)">
                <span className="text-green-600">✓</span> case #42 filed · evidence attached · /cases @rini
              </p>
            </div>
          </figure>
        </div>

        <div className="lg:col-span-5">
          <div className="max-w-[360px]">
            <DiscordProfileCard />
          </div>
          <p className="mt-3 max-w-[360px] text-center font-mono text-[11px] tracking-wider text-(--bolt-faint) uppercase">
            Free · Self-hosted · No signup
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10" aria-label="Command modules">
        <SectionHeading
          eyebrow="Registry"
          title="What Bolt can do"
          copy="Four lanes. Each entry lists permissions and invocation up front — no guessing."
          linkTo="/commands"
          linkLabel="Open registry"
        />
        <div className="mt-6">
          {MODULES.map((m, i) => (
            <Link
              key={m.id}
              to={`/commands?module=${m.id}`}
              className="bolt-enter bolt-registry-row group outline-none"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="font-mono text-xs tracking-wide text-(--bolt-action-strong)">0{i + 1}</span>
              <span className="font-display text-[1.25rem] font-bold tracking-tight text-(--bolt-ink)">{m.label}</span>
              <span className="col-span-3 text-[15px] leading-relaxed text-(--bolt-muted) lg:col-span-1">{m.blurb}</span>
              <span className="col-start-3 row-start-1 inline-flex items-center gap-2 justify-self-end font-mono text-[11px] tracking-wide text-(--bolt-muted) lg:col-start-4 lg:row-start-auto">
                <span className="hidden rounded-full bg-(--bolt-surface-hover) px-2 py-1 sm:inline-flex">
                  {commandData.commands.filter((c) => c.module === m.id).length} cmds
                </span>
                <span className="inline-flex sm:hidden">
                  {commandData.commands.filter((c) => c.module === m.id).length} cmds
                </span>
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
            copy="Escalation with receipts. Bolt checks authority when the action runs, not when the menu opened."
            linkTo="/guides/moderation-workflow"
            linkLabel="Read the workflow"
          />
          <ol className="bolt-ladder mt-6 grid gap-px overflow-hidden rounded-2xl border border-(--bolt-line) bg-(--bolt-line) sm:grid-cols-3 lg:grid-cols-5">
            {LADDER.map((step, i) => (
              <li
                key={step.label}
                className="bolt-enter relative bg-(--bolt-bg) p-5"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="absolute top-4 right-4 size-2 rounded-full bg-(--bolt-attention) sm:hidden" aria-hidden="true" />
                <p className="font-mono text-xs font-medium tracking-wide text-(--bolt-action-strong)">0{i + 1}</p>
                <p className="mt-1 font-display text-[17px] font-bold tracking-tight text-(--bolt-ink)">{step.label}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-(--bolt-muted)">{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 font-mono text-[11px] tracking-wide text-(--bolt-faint)">Each step rechecks membership, roles and hierarchy.</p>
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
            <div className="flex gap-4 py-6">
              <ShieldCheck size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-(--bolt-action-strong)" />
              <div>
                <h3 className="font-display text-[17px] font-bold tracking-tight text-(--bolt-ink)">Permissions rechecked at execution</h3>
                <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-(--bolt-muted)">
                  Every action verifies membership, configured roles and hierarchy right before it runs.
                </p>
              </div>
            </div>
            <div className="flex gap-4 py-6">
              <p
                className="grid size-5 shrink-0 place-items-center rounded-full bg-(--bolt-attention) font-mono text-[11px] font-bold text-(--bolt-ink)"
                aria-hidden="true"
              >
                /
              </p>
              <div>
                <h3 className="font-display text-[17px] font-bold tracking-tight text-(--bolt-ink)">Slash and prefix</h3>
                <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-(--bolt-muted)">
                  Slash for discovery, prefix for speed. Change the prefix per server with <code className="rounded bg-(--bolt-surface-hover) px-1.5 py-0.5 font-mono text-[13px]">/setprefix</code>.
                </p>
              </div>
            </div>
            <div className="flex gap-4 py-6">
              <p
                className="grid size-5 shrink-0 place-items-center rounded-full border border-(--bolt-line) bg-(--bolt-surface) font-mono text-[11px] font-bold text-(--bolt-ink)"
                aria-hidden="true"
              >
                {GUIDES.length}
              </p>
              <div>
                <h3 className="font-display text-[17px] font-bold tracking-tight text-(--bolt-ink)">Guides written from source</h3>
                <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-(--bolt-muted)">
                  Setup, permissions, workflows and internals — documented from the code, not from marketing.
                </p>
                <p className="mt-3">
                  <Badge variant="accent">Prefix works everywhere slash does</Badge>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
      <h2 className="mt-1 font-display text-[1.75rem] leading-tight font-bold tracking-[-0.02em] text-(--bolt-ink)">{title}</h2>
      <p className="mt-1.5 text-[15px] leading-relaxed text-(--bolt-muted)">{copy}</p>
      <p className="mt-3">
        <Link
          to={linkTo}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-(--bolt-action-strong) hover:text-(--bolt-action-hover)"
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
