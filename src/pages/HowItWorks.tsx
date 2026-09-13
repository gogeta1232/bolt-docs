import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

import { Card, CardDescription, CardTitle } from '../components/ui/card';

const STEPS = [
  {
    n: '01',
    title: 'Validate env',
    body: 'src/config/env.ts parses every variable with Zod before the bot connects. Nothing half-configured boots.'
  },
  {
    n: '02',
    title: 'Wire services',
    body: 'src/setup/container.ts attaches database, config, cases, warnings and schedulers as typed singletons.'
  },
  {
    n: '03',
    title: 'Connect + restore',
    body: 'Log in, then lazily restore reactions, snipes and cases. Mute timers re-arm from MongoDB.'
  },
  {
    n: '04',
    title: 'Register globally',
    body: 'Slash commands register globally with overwrite behavior. Health at GET /health includes MongoDB readiness.'
  }
];

const LAYERS = [
  {
    title: 'Channel permissions',
    body: 'The bot must hold the Discord permission in that channel — checked first, no bypass.'
  },
  {
    title: 'Moderation gate',
    body: 'Owner, Administrator, Manage Guild, or a configured admin role. See src/preconditions/.'
  },
  {
    title: 'Live hierarchy check',
    body: 'Command-specific permission plus a live bannable check at execution time.'
  }
];

export function HowItWorksPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="font-mono text-xs font-medium tracking-[0.18em] text-(--bolt-action-strong) uppercase">Internals</p>
      <h1 className="mt-1 font-display text-4xl font-bold tracking-[-0.02em] text-(--bolt-ink)">How Bolt works</h1>
      <div className="bolt-headline-rule" aria-hidden="true" />
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-(--bolt-muted)">
        Startup order, permission layers and the moderation pipeline — the short version. Deep dives below.
      </p>

      <h2 className="mt-10 font-display text-xl font-bold tracking-tight text-(--bolt-ink)">Boot sequence</h2>
      <ol className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            className="bolt-enter relative overflow-hidden rounded-xl border border-(--bolt-line) bg-(--bolt-surface) p-4"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-(--bolt-attention) opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            <p className="font-mono text-xs font-medium tracking-wide text-(--bolt-action-strong)">{s.n}</p>
            <p className="mt-1 font-display text-[15px] font-bold tracking-tight text-(--bolt-ink)">{s.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-(--bolt-muted)">{s.body}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-10 font-display text-xl font-bold tracking-tight text-(--bolt-ink)">Three permission layers</h2>
      <p className="mt-1 text-sm text-(--bolt-faint)">Each layer must pass. Authority is rechecked when the action runs.</p>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {LAYERS.map((l, i) => (
          <Card key={l.title} className="bolt-enter border-(--bolt-line)" style={{ animationDelay: `${i * 60}ms` }}>
            <CardTitle className="text-[15px]">{l.title}</CardTitle>
            <CardDescription className="text-[13.5px] leading-relaxed">{l.body}</CardDescription>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 font-display text-xl font-bold tracking-tight text-(--bolt-ink)">Deep dives</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {[
          {
            to: '/guides/startup-and-registration',
            title: 'Startup and registration',
            desc: 'Boot order, global registration, health checks.'
          },
          {
            to: '/guides/cases-and-logging',
            title: 'Cases and logging',
            desc: 'Atomic case counters, DMs, log fan-out.'
          }
        ].map((g) => (
          <Link key={g.to} to={g.to} className="bolt-lift bolt-fade block rounded-xl outline-none">
            <Card className="h-full border-(--bolt-line) hover:border-(--bolt-faint)">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-[15px]">{g.title}</CardTitle>
                <ArrowUpRight size={16} aria-hidden className="shrink-0 text-(--bolt-faint)" />
              </div>
              <CardDescription className="text-[13.5px]">{g.desc}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
