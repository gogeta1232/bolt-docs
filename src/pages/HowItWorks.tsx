import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

import { Card, CardDescription, CardTitle } from '../components/ui/card';

const STEPS = [
  {
    n: '01',
    title: 'Validate env',
    body: 'src/config/env.ts parses and validates every variable with Zod before the bot connects. Nothing half-configured ever boots.'
  },
  {
    n: '02',
    title: 'Wire services',
    body: 'src/setup/container.ts attaches database, config, logging, cases, AFK, warnings and schedulers as typed singletons.'
  },
  {
    n: '03',
    title: 'Connect + restore',
    body: 'Login, then lazily initialize reactions, snipes and cases. Mute timers re-arm from MongoDB schedules.'
  },
  {
    n: '04',
    title: 'Register globally',
    body: 'Slash commands register globally with overwrite behavior. Health served at GET /health with MongoDB readiness.'
  }
];

const LAYERS = [
  {
    title: 'Channel permissions',
    body: 'The bot must hold the Discord permission in that channel — checked first, no bypass.'
  },
  {
    title: 'Moderation gate',
    body: 'Owner, Administrator, ManageGuild, or a configured admin role. See src/preconditions/.'
  },
  {
    title: 'In-command + hierarchy',
    body: 'Command-specific Discord perm plus a live bannable/hierarchy recheck at execution.'
  }
];

export function HowItWorksPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="font-mono text-xs font-medium tracking-widest text-(--bolt-action-strong) uppercase">Internals</p>
      <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-(--bolt-ink)">How Bolt works</h1>
      <p className="mt-2 max-w-2xl text-(--bolt-muted)">
        Startup order, permission layers and the moderation pipeline — the short version. Deep dives linked below.
      </p>

      <h2 className="mt-10 font-display text-xl font-bold text-(--bolt-ink)">Boot sequence</h2>
      <ol className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            className="bolt-enter rounded-xl border border-(--bolt-line) bg-(--bolt-surface) p-4"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <p className="font-mono text-xs text-(--bolt-action-strong)">{s.n}</p>
            <p className="mt-1 font-display font-bold text-(--bolt-ink)">{s.title}</p>
            <p className="mt-1 text-sm text-(--bolt-muted)">{s.body}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-10 font-display text-xl font-bold text-(--bolt-ink)">Three permission layers</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {LAYERS.map((l) => (
          <Card key={l.title}>
            <CardTitle>{l.title}</CardTitle>
            <CardDescription>{l.body}</CardDescription>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 font-display text-xl font-bold text-(--bolt-ink)">Deep dives</h2>
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
            <Card className="h-full">
              <div className="flex items-start justify-between gap-2">
                <CardTitle>{g.title}</CardTitle>
                <ArrowUpRight size={18} aria-hidden className="shrink-0 text-(--bolt-faint)" />
              </div>
              <CardDescription>{g.desc}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
