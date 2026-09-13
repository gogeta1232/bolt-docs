import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link, Navigate, useParams } from 'react-router';
import remarkGfm from 'remark-gfm';

import { GUIDES, getGuide, headingsOf, slugify } from '../lib/guides';

export function GuidePage(): React.JSX.Element {
  const { slug } = useParams();
  const guide = slug ? getGuide(slug) : undefined;

  if (!guide) return <Navigate to="/guides" replace />;

  const headings = headingsOf(guide.body);
  const sectionGuides = guideSection(guide.section);
  const at = sectionGuides.findIndex((g) => g.slug === guide.slug);
  const prev = at > 0 ? sectionGuides[at - 1] : undefined;
  const next = at >= 0 && at < sectionGuides.length - 1 ? sectionGuides[at + 1] : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/guides"
        className="bolt-fade inline-flex min-h-[44px] items-center gap-1.5 rounded-xl text-sm font-semibold text-(--bolt-muted) hover:text-(--bolt-ink)"
      >
        <ArrowLeft size={16} aria-hidden /> All guides
      </Link>
      <div className="mt-2 grid gap-8 lg:grid-cols-[1fr_220px]">
        <article className="min-w-0">
          <p className="font-mono text-xs font-medium tracking-widest text-(--bolt-action-strong) uppercase">
            {guide.section}
          </p>
          <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-(--bolt-ink)">{guide.title}</h1>
          <p className="mt-2 text-lg text-(--bolt-muted)">{guide.description}</p>
          <div className="bolt-prose mt-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              urlTransform={(url) => {
                if (/^(https?:\/\/|\/|#)/.test(url)) return url;
                if (url.startsWith('mailto:')) return url;
                return '#';
              }}
              components={{
                h2: ({ children }) => {
                  const text = String(children);
                  return <h2 id={slugify(text)}>{children}</h2>;
                },
                h3: ({ children }) => {
                  const text = String(children);
                  return <h3 id={slugify(text)}>{children}</h3>;
                },
                a: ({ href, children }) => {
                  const isExternal = href?.startsWith('http');
                  if (href && /^(javascript|data|vbscript|file):/i.test(href)) return <span>{children}</span>;
                  return (
                    <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
                      {children}
                    </a>
                  );
                },
                img: ({ src, alt }) => {
                  if (src && /^(javascript|data|vbscript):/i.test(src)) return null;
                  return <img src={src} alt={alt ?? ''} loading="lazy" referrerPolicy="no-referrer" />;
                }
              }}
            >
              {guide.body}
            </ReactMarkdown>
          </div>
          <nav aria-label="More guides" className="mt-10 grid gap-2 sm:grid-cols-2">
            {prev ? <GuidePager to={`/guides/${prev.slug}`} label="Previous" title={prev.title} /> : <span />}
            {next ? <GuidePager to={`/guides/${next.slug}`} label="Next" title={next.title} align="end" /> : <span />}
          </nav>
        </article>
        {headings.length > 0 ? (
          <aside className="hidden lg:block" aria-label="On this page">
            <div className="sticky top-24">
              <p className="text-xs font-semibold tracking-wide text-(--bolt-faint) uppercase">On this page</p>
              <ul className="mt-2 space-y-1 border-l border-(--bolt-line)">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className={`bolt-fade -ms-px block border-l-2 border-transparent py-1 text-sm text-(--bolt-muted) hover:border-(--bolt-action) hover:text-(--bolt-ink) ${
                        h.level === 3 ? 'ps-6' : 'ps-3'
                      }`}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}

function guideSection(section: string): { slug: string; title: string }[] {
  return GUIDES.filter((g) => g.section === section);
}

function GuidePager({
  to,
  label,
  title,
  align
}: {
  to: string;
  label: string;
  title: string;
  align?: 'end';
}): React.JSX.Element {
  return (
    <Link
      to={to}
      className={`bolt-fade flex min-h-[44px] items-center gap-2 rounded-xl border border-(--bolt-line) bg-(--bolt-surface) px-4 py-2.5 text-sm hover:bg-(--bolt-surface-hover) ${align === 'end' ? 'justify-end text-right' : ''}`}
    >
      {align !== 'end' ? <ArrowLeft size={16} aria-hidden className="shrink-0 text-(--bolt-faint)" /> : null}
      <span>
        <span className="block text-xs text-(--bolt-faint)">{label}</span>
        <span className="block font-semibold text-(--bolt-ink)">{title}</span>
      </span>
      {align === 'end' ? <ArrowRight size={16} aria-hidden className="shrink-0 text-(--bolt-faint)" /> : null}
    </Link>
  );
}
