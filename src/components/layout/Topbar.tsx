import { Search } from 'lucide-react';

import { ThemeToggle } from './ThemeToggle';

function GithubIcon(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function Topbar({ onPalette }: { onPalette: () => void }): React.JSX.Element {
  return (
    <header className="sticky top-0 z-20 border-b border-(--bolt-line) bg-[color-mix(in_srgb,var(--bolt-bg)_90%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <button
          type="button"
          onClick={onPalette}
          className="bolt-fade flex h-10 min-w-0 flex-1 cursor-pointer items-center gap-2.5 rounded-full border border-(--bolt-line) bg-(--bolt-surface) px-3.5 text-[13.5px] font-medium tracking-[-0.01em] text-(--bolt-faint) hover:border-(--bolt-faint) hover:text-(--bolt-muted) sm:max-w-[360px]"
          aria-label="Search docs and commands (Control K)"
        >
          <Search size={15} aria-hidden className="shrink-0 text-(--bolt-faint)" />
          <span className="truncate">Search commands, guides…</span>
          <kbd className="ms-auto hidden shrink-0 rounded-full border border-(--bolt-line) bg-(--bolt-surface-hover) px-2 py-0.5 font-mono text-[10px] tracking-wide text-(--bolt-faint) sm:inline-flex">
            Ctrl K
          </kbd>
        </button>
        <span className="ms-auto" />
        <ThemeToggle />
        <a
          href="https://github.com/gogeta1232/Bolt"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bolt on GitHub"
          className="bolt-fade inline-flex size-11 items-center justify-center rounded-xl text-(--bolt-muted) hover:bg-(--bolt-surface-hover) hover:text-(--bolt-ink)"
        >
          <GithubIcon />
        </a>
      </div>
    </header>
  );
}
