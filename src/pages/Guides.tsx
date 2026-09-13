import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

import { Card, CardDescription, CardTitle } from '../components/ui/card';
import { GUIDES } from '../lib/guides';

const SECTIONS = ['Start here', 'Guides', 'How Bolt works'] as const;

export function GuidesPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="font-mono text-xs font-medium tracking-[0.18em] text-(--bolt-action-strong) uppercase">Learn</p>
      <h1 className="mt-1 font-display text-4xl font-bold tracking-[-0.02em] text-(--bolt-ink)">Guides</h1>
      <div className="bolt-headline-rule" aria-hidden="true" />
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-(--bolt-muted)">
        Setup, permissions and moderation workflows — written from the source, not from marketing.
      </p>
      {SECTIONS.map((section) => (
        <section key={section} aria-label={section} className="mt-10">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-[1.15rem] font-bold tracking-tight text-(--bolt-ink)">{section}</h2>
            <span className="h-px flex-1 bg-(--bolt-line)" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wide text-(--bolt-faint)">
              {GUIDES.filter((g) => g.section === section).length}
            </span>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {GUIDES.filter((g) => g.section === section).map((g, i) => (
              <Link
                key={g.slug}
                to={`/guides/${g.slug}`}
                className="bolt-enter bolt-lift bolt-fade block rounded-xl outline-none"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <Card className="h-full border-(--bolt-line) hover:border-(--bolt-faint) hover:bg-(--bolt-surface-hover)/50">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-[15px] leading-tight">{g.title}</CardTitle>
                    <ArrowUpRight size={16} aria-hidden className="mt-0.5 shrink-0 text-(--bolt-faint)" />
                  </div>
                  <CardDescription className="mt-1.5 line-clamp-2 text-[13.5px]">{g.description}</CardDescription>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
