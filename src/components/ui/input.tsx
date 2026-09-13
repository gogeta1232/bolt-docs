import { Search } from 'lucide-react';
import * as React from 'react';

import { cn } from './utils';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  ref?: React.Ref<HTMLInputElement>;
}

function SearchInput({ className, label, ref, ...props }: SearchInputProps): React.JSX.Element {
  return (
    <label
      className={cn(
        'bolt-fade flex min-h-[44px] items-center gap-2 rounded-xl border border-(--bolt-line) bg-(--bolt-surface) px-3 text-(--bolt-muted) transition-colors focus-within:border-(--bolt-action)',
        className
      )}
    >
      <Search size={16} aria-hidden className="shrink-0" />
      <span className="sr-only">{label}</span>
      <input
        ref={ref}
        className="w-full bg-transparent py-2 text-sm text-(--bolt-ink) outline-none placeholder:text-(--bolt-faint)"
        {...props}
      />
    </label>
  );
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

function Select({ className, label, children, ...props }: SelectProps): React.JSX.Element {
  return (
    <label
      className={cn(
        'bolt-fade flex min-h-[44px] cursor-pointer items-center rounded-xl border border-(--bolt-line) bg-(--bolt-surface) px-3 text-sm text-(--bolt-ink)',
        className
      )}
    >
      <span className="sr-only">{label}</span>
      <select className="cursor-pointer bg-transparent py-2 outline-none" {...props}>
        {children}
      </select>
    </label>
  );
}

export { SearchInput, Select };
