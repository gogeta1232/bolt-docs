import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

import { Card, CardDescription, CardTitle } from '../components/ui/card';
import { GUIDES } from '../lib/guides';

const SECTIONS = ['Start here', 'Guides', 'How Bolt works'] as const;

export function GuidesPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="font-mono text-xs font-medium tracking-widest text-(--bolt-action-strong) uppercase">Learn</p>
      <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-(--bolt-ink)">Guides</h1>
      <p className="mt-2 max-w-2xl text-(--bolt-muted)">
        Setup, permissions and moderation workflows — written from the source, not marketing.
      </p>
      {SECTIONS.map((section) => (
        <section key={section} aria-label={section} className="mt-8">
          <h2 className="font-display text-lg font-bold text-(--bolt-ink)">{section}</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {GUIDES.filter((g) => g.section === section).map((g, i) => (
              <Link
                key={g.slug}
                to={`/guides/${g.slug}`}
                className="bolt-enter bolt-lift bolt-fade block rounded-xl outline-none"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <Card className="h-full">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle>{g.title}</CardTitle>
                    <ArrowUpRight size={18} aria-hidden className="shrink-0 text-(--bolt-faint)" />
                  </div>
                  <CardDescription>{g.description}</CardDescription>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
