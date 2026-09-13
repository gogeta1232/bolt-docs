import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from './utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border border-(--bolt-line) bg-(--bolt-surface) px-2.5 py-1 text-xs font-medium text-(--bolt-muted) whitespace-nowrap',
  {
    variants: {
      variant: {
        default: '',
        accent: 'border-transparent bg-(--bolt-action-soft) text-(--bolt-action-strong)'
      }
    },
    defaultVariants: { variant: 'default' }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps): React.JSX.Element {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
