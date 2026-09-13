import * as React from 'react';

import { cn } from './utils';

function Card({ className, ...props }: React.HTMLAttributes<HTMLElement>): React.JSX.Element {
  return (
    <article
      className={cn(
        'bolt-fade rounded-xl border border-(--bolt-line) bg-(--bolt-surface) p-4 shadow-[var(--bolt-shadow)]',
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>): React.JSX.Element {
  return <h3 className={cn('text-base font-semibold text-(--bolt-ink)', className)} {...props} />;
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>): React.JSX.Element {
  return <p className={cn('mt-1 text-sm leading-relaxed text-(--bolt-muted)', className)} {...props} />;
}

export { Card, CardDescription, CardTitle };
