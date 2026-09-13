import { Laptop, Moon, Sun } from 'lucide-react';

import { useTheme } from '../../lib/use-theme';
import type { ThemeMode } from '../../lib/theme-context';
import { cn } from '../ui/utils';

const OPTIONS: { value: ThemeMode; label: string; Icon: typeof Sun }[] = [
  { value: 'dark', label: 'Dark theme', Icon: Moon },
  { value: 'light', label: 'Light theme', Icon: Sun },
  { value: 'system', label: 'System theme', Icon: Laptop }
];

/**
 * Fixed 40px circle showing the active theme; hover or keyboard focus reveals
 * a dropdown with every option. The collapsed circle never resizes, so the
 * icon cannot drift off-center.
 */
export function ThemeToggle(): React.JSX.Element {
  const { mode, setMode } = useTheme();
  const active = OPTIONS.find((o) => o.value === mode);

  const cycle = (): void => {
    const idx = OPTIONS.findIndex((o) => o.value === mode);
    const next = OPTIONS[(idx + 1) % OPTIONS.length];
    if (next) setMode(next.value);
  };

  return (
    <div role="group" aria-label="Color theme" className="group relative">
      <button
        type="button"
        onClick={cycle}
        aria-label={active ? `Theme: ${active.label}. Activate to switch theme.` : 'Switch theme'}
        title={active?.label ?? 'Switch theme'}
        className="bolt-fade grid size-10 cursor-pointer place-items-center rounded-full border border-(--bolt-line) bg-(--bolt-surface)"
      >
        <span
          key={mode}
          className="bolt-theme-switch grid size-8 place-items-center rounded-full bg-(--bolt-action-soft) text-(--bolt-action-strong)"
        >
          {active && <active.Icon size={16} aria-hidden className="block" />}
        </span>
      </button>
      <div className="invisible absolute top-[calc(100%+8px)] right-0 z-50 flex -translate-y-1 flex-col gap-1 rounded-2xl border border-(--bolt-line) bg-(--bolt-surface) p-1.5 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {OPTIONS.map(({ value, label, Icon }) => {
          const selected = mode === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              aria-pressed={selected}
              aria-label={label}
              title={label}
              className={cn(
                'bolt-fade grid size-9 cursor-pointer place-items-center rounded-xl border-0 bg-transparent text-(--bolt-faint) hover:bg-(--bolt-surface-hover) hover:text-(--bolt-ink)',
                selected && 'bg-(--bolt-action-soft) text-(--bolt-action-strong)'
              )}
            >
              <Icon size={16} aria-hidden className="block" />
            </button>
          );
        })}
      </div>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .bolt-theme-switch {
            animation: theme-switch-in 260ms ease-out both;
          }
          @keyframes theme-switch-in {
            from { opacity: 0; transform: scale(0.6) rotate(-40deg); }
            to { opacity: 1; transform: scale(1) rotate(0); }
          }
        }
      `}</style>
    </div>
  );
}
