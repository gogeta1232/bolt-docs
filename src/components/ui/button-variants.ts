import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'bolt-fade inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-(--bolt-action) focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-(--bolt-action) text-(--bolt-action-on) hover:bg-(--bolt-action-hover)',
        secondary: 'border border-(--bolt-line) bg-(--bolt-surface) text-(--bolt-ink) hover:bg-(--bolt-surface-hover)',
        ghost: 'text-(--bolt-ink) hover:bg-(--bolt-surface-hover)'
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-11 px-5',
        icon: 'size-11'
      }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
);

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;

export { buttonVariants };
