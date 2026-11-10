import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { isSkillId, type SkillId } from '../content';

export type SkillSelection = {
  /** The skill currently shown: the previewed one if any, otherwise the pinned one. */
  active: SkillId | null;
  pinned: SkillId | null;
  /** Temporarily show a skill (hover/focus); `null` ends the preview. */
  preview: (skill: SkillId | null) => void;
  /** Pin a skill, or unpin it if it is already pinned. */
  togglePin: (skill: SkillId) => void;
  clear: () => void;
};

const PARAM = 'skill';
/** Delay before a preview ends, so moving between adjacent skills doesn't flicker. */
const LEAVE_DELAY_MS = 80;

function readPinnedFromUrl(): SkillId | null {
  const value = new URLSearchParams(window.location.search).get(PARAM);
  return isSkillId(value) ? value : null;
}

function writePinnedToUrl(skill: SkillId | null) {
  const url = new URL(window.location.href);
  if (skill) url.searchParams.set(PARAM, skill);
  else url.searchParams.delete(PARAM);
  if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
}

const Context = createContext<SkillSelection | null>(null);

export function SkillSelectionProvider({ children }: { children: ReactNode }) {
  const [pinned, setPinned] = useState<SkillId | null>(readPinnedFromUrl);
  const [previewed, setPreviewed] = useState<SkillId | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Keep the URL in sync with the pinned skill; this also drops unknown values on load.
  useEffect(() => writePinnedToUrl(pinned), [pinned]);

  useEffect(() => {
    const onPopState = () => setPinned(readPinnedFromUrl());
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
      clearTimeout(leaveTimer.current);
    };
  }, []);

  const preview = useCallback((skill: SkillId | null) => {
    clearTimeout(leaveTimer.current);
    if (skill) setPreviewed(skill);
    else leaveTimer.current = setTimeout(() => setPreviewed(null), LEAVE_DELAY_MS);
  }, []);

  const togglePin = useCallback((skill: SkillId) => {
    clearTimeout(leaveTimer.current);
    // Drop the preview so unpinning visibly returns to the default state.
    setPreviewed(null);
    setPinned((current) => (current === skill ? null : skill));
  }, []);

  const clear = useCallback(() => {
    clearTimeout(leaveTimer.current);
    setPreviewed(null);
    setPinned(null);
  }, []);

  const value = useMemo(
    () => ({ active: previewed ?? pinned, pinned, preview, togglePin, clear }),
    [previewed, pinned, preview, togglePin, clear],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useSkillSelection(): SkillSelection {
  const value = useContext(Context);
  if (!value) throw new Error('useSkillSelection must be used inside SkillSelectionProvider');
  return value;
}
