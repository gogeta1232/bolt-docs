import { BookOpen, GitBranch, House, PanelLeftClose, PanelLeftOpen, Terminal } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';

import { cn } from '../ui/utils';

const HOME_ITEM = { to: '/', label: 'Home', icon: House, end: true };

const TREE_ITEMS = [
  { to: '/commands', label: 'Commands', icon: Terminal, end: false },
  { to: '/guides', label: 'Guides', icon: BookOpen, end: false },
  { to: '/how-it-works', label: 'How it works', icon: GitBranch, end: false }
];

const MOBILE_ITEMS = [HOME_ITEM, ...TREE_ITEMS];

const TREE_ORDER = ['/commands', '/guides', '/how-it-works'];

function RailLabel({ collapsed, children }: { collapsed: boolean; children: string }): React.JSX.Element {
  return (
    <span
      aria-hidden={collapsed}
      className={cn(
        'shrink-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] motion-safe:duration-200 motion-reduce:transition-none',
        collapsed ? 'max-w-0 opacity-0' : 'max-w-[160px] opacity-100'
      )}
    >
      {children}
    </span>
  );
}

export function Rail({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }): React.JSX.Element {
  const { pathname } = useLocation();
  const [glide, setGlide] = useState<'up' | 'down'>('down');

  const idxOf = (p: string): number => TREE_ORDER.findIndex((t) => p === t || p.startsWith(`${t}/`));

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label="Primary"
        className={cn(
          'bolt-rail fixed inset-y-0 left-0 z-30 hidden flex-col gap-1 overflow-hidden border-r border-(--bolt-line) bg-(--bolt-surface) p-3 md:flex',
          collapsed ? 'bolt-rail-collapsed w-[68px]' : 'w-60'
        )}
      >
        <div
          className={cn(
            'flex w-full items-center',
            collapsed ? 'flex-col justify-center gap-2' : 'justify-between gap-2'
          )}
        >
          <a
            href="/"
            className="bolt-fade bolt-rail-brand flex items-center gap-2.5 rounded-xl p-1"
            aria-label="Bolt docs home"
            title="Bolt docs home"
          >
            <img
              src="/bolt_pfp.webp"
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-[9px] object-cover"
            />
            <RailLabel collapsed={collapsed}>Bolt</RailLabel>
          </a>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="bolt-fade group/toggle grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border border-transparent text-(--bolt-faint) hover:bg-(--bolt-surface-hover) hover:text-(--bolt-muted) active:scale-95"
          >
            {collapsed ? (
              <PanelLeftOpen size={16} aria-hidden className="place-self-center" />
            ) : (
              <PanelLeftClose size={16} aria-hidden className="place-self-center" />
            )}
          </button>
        </div>
        <div className="mt-4 flex w-full flex-col gap-1">
          <NavLink
            to={HOME_ITEM.to}
            end={HOME_ITEM.end}
            title={HOME_ITEM.label}
            className={({ isActive }) => cn('bolt-rail-link', isActive && 'is-active')}
          >
            <HOME_ITEM.icon size={18} aria-hidden className="shrink-0" />
            <RailLabel collapsed={collapsed}>{HOME_ITEM.label}</RailLabel>
          </NavLink>
          <div
            className={cn(
              'bolt-rail-tree-wrap flex flex-col gap-1',
              collapsed ? 'mt-1 w-full items-center' : 'bolt-rail-tree relative ms-[26px] ps-2'
            )}
            aria-label="Docs sections"
          >
            {TREE_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                title={item.label}
                onClick={() => {
                  const to = TREE_ORDER.indexOf(item.to);
                  setGlide(to >= idxOf(pathname) ? 'down' : 'up');
                }}
                className={({ isActive }) => cn('bolt-rail-link-sm', isActive && 'is-active')}
              >
                {({ isActive: on }) => (
                  <>
                    <span
                      key={on ? `glow-${item.to}-${glide}` : 'glow-off'}
                      data-dir={glide}
                      className="bolt-rail-glow"
                      aria-hidden="true"
                    />
                    <item.icon size={15} aria-hidden className="shrink-0" />
                    <RailLabel collapsed={collapsed}>{item.label}</RailLabel>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
        <p
          className={cn(
            'mt-auto font-mono text-xs whitespace-nowrap text-(--bolt-faint) transition-opacity motion-safe:duration-300 motion-reduce:transition-none',
            collapsed && 'invisible opacity-0'
          )}
        >
          Bolt docs
          <br />
          v1 · static build
        </p>
      </nav>
      {/* Mobile bottom bar (≤4 items, thumb reach) */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-(--bolt-line) bg-(--bolt-surface) px-2 pt-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] md:hidden"
      >
        {MOBILE_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => cn('bolt-rail-link-mobile', isActive && 'is-active')}
          >
            <item.icon size={20} aria-hidden />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <style>{`
        .bolt-rail-link {
          display: flex; align-items: center; gap: 0.75rem;
          min-height: 44px; padding: 0.625rem 0.875rem;
          border-radius: 12px; font-size: 0.9375rem; font-weight: 500;
          color: var(--bolt-muted); text-decoration: none;
          transition:
            background-color 160ms ease-out,
            color 160ms ease-out,
            padding 500ms cubic-bezier(0.22, 1, 0.36, 1),
            gap 500ms cubic-bezier(0.22, 1, 0.36, 1),
            width 500ms cubic-bezier(0.22, 1, 0.36, 1),
            margin 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bolt-rail-link:hover { background: var(--bolt-surface-hover); color: var(--bolt-ink); }
        .bolt-rail-link.is-active { background: var(--bolt-action-soft); color: var(--bolt-action-strong); font-weight: 600; }
        .bolt-rail-link-sm {
          display: flex; align-items: center; gap: 0.625rem;
          position: relative;
          min-height: 40px; padding: 0.5rem 0.75rem;
          border-radius: 10px; font-size: 0.8125rem; font-weight: 500;
          color: var(--bolt-faint); text-decoration: none;
          transition:
            background-color 160ms ease-out,
            color 160ms ease-out,
            padding 500ms cubic-bezier(0.22, 1, 0.36, 1),
            gap 500ms cubic-bezier(0.22, 1, 0.36, 1),
            width 500ms cubic-bezier(0.22, 1, 0.36, 1),
            margin 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bolt-rail-link-sm:hover { background: var(--bolt-surface-hover); color: var(--bolt-ink); }
        .bolt-rail-link-sm.is-active { background: var(--bolt-action-soft); color: var(--bolt-action-strong); font-weight: 600; }
        .bolt-rail-brand {
          transition:
            gap 500ms cubic-bezier(0.22, 1, 0.36, 1),
            padding 500ms cubic-bezier(0.22, 1, 0.36, 1),
            width 500ms cubic-bezier(0.22, 1, 0.36, 1),
            margin 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bolt-rail-tree-wrap {
          transition: margin 500ms cubic-bezier(0.22, 1, 0.36, 1), padding 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bolt-rail-collapsed .bolt-rail-brand {
          gap: 0; width: 44px; height: 44px;
          margin-inline: auto; padding: 0;
          justify-content: center;
        }
        .bolt-rail-collapsed .bolt-rail-link,
        .bolt-rail-collapsed .bolt-rail-link-sm {
          gap: 0; padding: 0;
          justify-content: center; align-items: center;
          margin-inline: auto;
          overflow: hidden; white-space: nowrap;
        }
        .bolt-rail-collapsed .bolt-rail-link { width: 44px; height: 44px; }
        .bolt-rail-collapsed .bolt-rail-link-sm { width: 40px; height: 40px; }
        .bolt-rail-collapsed .bolt-rail-glow { display: none; }
        .bolt-rail-tree::before {
          content: ''; position: absolute; left: 0; top: 10px; bottom: 10px;
          width: 1px; border-radius: 999px;
          background: var(--bolt-line);
        }
        .bolt-rail-glow {
          position: absolute; left: -8px; top: 0; bottom: 0;
          width: 1px; border-radius: 999px; pointer-events: none;
          transform-origin: top;
          background: linear-gradient(
            to bottom,
            transparent,
            color-mix(in srgb, var(--bolt-action) 60%, transparent) 25%,
            color-mix(in srgb, var(--bolt-action) 60%, transparent) 75%,
            transparent
          );
          box-shadow: 0 0 10px 0 color-mix(in srgb, var(--bolt-action) 25%, transparent);
          opacity: 0;
        }
        .bolt-rail-glow[data-dir='up'] {
          transform-origin: bottom;
        }
        .bolt-rail-link-sm.is-active .bolt-rail-glow[data-dir='down'] {
          animation: rail-glow-in-down 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .bolt-rail-link-sm.is-active .bolt-rail-glow[data-dir='up'] {
          animation: rail-glow-in-up 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes rail-glow-in-down {
          0% { opacity: 0; transform: translateY(-14px) scaleY(0.2); }
          55% { opacity: 1; }
          100% { opacity: 1; transform: none; }
        }
        @keyframes rail-glow-in-up {
          0% { opacity: 0; transform: translateY(14px) scaleY(0.2); }
          55% { opacity: 1; }
          100% { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bolt-rail-glow { animation: none; }
          .bolt-rail-link-sm.is-active .bolt-rail-glow { opacity: 1; }
        }
        .bolt-rail-link-mobile {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
          min-height: 52px; justify-content: center;
          font-size: 0.6875rem; font-weight: 500;
          color: var(--bolt-faint); text-decoration: none; border-radius: 10px;
        }
        .bolt-rail-link-mobile.is-active { color: var(--bolt-action-strong); }
      `}</style>
    </>
  );
}
