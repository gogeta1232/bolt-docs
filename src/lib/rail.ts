import { useCallback, useState } from 'react';

const RAIL_KEY = 'bolt-rail-collapsed';

function loadRailCollapsed(): boolean {
  return localStorage.getItem(RAIL_KEY) !== '0';
}

export function useRailCollapsed(): { collapsed: boolean; onToggle: () => void } {
  const [collapsed, setCollapsed] = useState<boolean>(loadRailCollapsed);
  const onToggle = useCallback(() => {
    setCollapsed((v) => {
      const next = !v;
      localStorage.setItem(RAIL_KEY, next ? '1' : '0');
      return next;
    });
  }, []);
  return { collapsed, onToggle };
}
