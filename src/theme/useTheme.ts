import { useMediaQuery } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

/** Also read by the pre-paint script in index.html; keep the two in sync. */
export const THEME_STORAGE_KEY = 'theme';

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

/**
 * The visitor's explicit choice wins and persists; without one the OS setting
 * applies (and is followed live). The CSS reads `data-theme` on <html>.
 */
export function useTheme() {
  const [stored, setStored] = useState<Theme | null>(readStored);
  const osDark = useMediaQuery('(prefers-color-scheme: dark)', false, { getInitialValueInEffect: false });
  const theme: Theme = stored ?? (osDark ? 'dark' : 'light');

  useEffect(() => {
    if (stored) document.documentElement.dataset.theme = stored;
    else delete document.documentElement.dataset.theme;
  }, [stored]);

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setStored(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable: the choice lasts for this page view only.
    }
  }, [theme]);

  return { theme, toggle };
}
