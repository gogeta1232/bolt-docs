import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';

import { CommandPalette } from './components/layout/CommandPalette';
import { Rail } from './components/layout/Rail';
import { Topbar } from './components/layout/Topbar';
import { cn } from './components/ui/utils';
import { useRailCollapsed } from './lib/rail';
import { CommandDetailPage } from './features/commands/CommandDetail';
import { ThemeProvider } from './lib/theme';
import { CommandsPage } from './pages/Commands';
import { GuidePage } from './pages/Guide';
import { GuidesPage } from './pages/Guides';
import { HomePage } from './pages/Home';
import { HowItWorksPage } from './pages/HowItWorks';
import { NotFoundPage } from './pages/NotFound';

function ScrollToTop(): null {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

function Shell(): React.JSX.Element {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const { pathname } = useLocation();
  const { collapsed, onToggle } = useRailCollapsed();

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen">
      <Rail collapsed={collapsed} onToggle={onToggle} />
      <div className={cn('bolt-shell min-w-0 overflow-x-clip', collapsed ? 'md:ps-[68px]' : 'md:ps-60')}>
        <Topbar onPalette={openPalette} />
        <main className="pb-24 md:pb-12">
          <ScrollToTop />
          <div key={pathname} className="bolt-page-enter">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/commands" element={<CommandsPage />} />
              <Route path="/commands/:name" element={<CommandDetailPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/guides/:slug" element={<GuidePage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <footer className="border-t border-(--bolt-line) px-4 py-6 pb-24 md:pb-6">
          <p className="mx-auto max-w-6xl text-sm text-(--bolt-faint)">
            Bolt docs · generated from <a href="https://github.com/gogeta1232/Bolt-OS" target="_blank" rel="noopener noreferrer" className="font-semibold text-(--bolt-muted) underline underline-offset-4">Bolt-OS</a> ·{' '}
            <a
              href="https://github.com/gogeta1232/bolt-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-(--bolt-muted) underline underline-offset-4"
            >
              bolt-docs on GitHub
            </a>
          </p>
        </footer>
      </div>
      <CommandPalette key={String(paletteOpen)} open={paletteOpen} onClose={closePalette} />
    </div>
  );
}

export function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </ThemeProvider>
  );
}
