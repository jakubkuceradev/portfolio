import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { isSkillId, type SkillId } from '../content';

export type SkillSelection = {
  /** The skill entries are emphasised for: the previewed one if any, otherwise the pinned one. */
  active: SkillId | null;
  /**
   * The skill whose bullets are expanded. A preview only takes over after the
   * visitor dwells on it, so a passing hover changes emphasis but not layout.
   */
  revealed: SkillId | null;
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
/** How long a preview must last before its bullets expand. */
export const REVEAL_DELAY_MS = 600;

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
  const [revealedPreview, setRevealedPreview] = useState<SkillId | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const revealTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  /** Mirrors `previewed` so `preview` can tell a new skill from a repeat without an impure updater. */
  const previewedRef = useRef<SkillId | null>(null);

  const resetPreview = useCallback(() => {
    clearTimeout(leaveTimer.current);
    clearTimeout(revealTimer.current);
    previewedRef.current = null;
    setPreviewed(null);
    setRevealedPreview(null);
  }, []);

  // Keep the URL in sync with the pinned skill; this also drops unknown values on load.
  useEffect(() => writePinnedToUrl(pinned), [pinned]);

  useEffect(() => {
    const onPopState = () => setPinned(readPinnedFromUrl());
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
      clearTimeout(leaveTimer.current);
      clearTimeout(revealTimer.current);
    };
  }, []);

  const preview = useCallback(
    (skill: SkillId | null) => {
      clearTimeout(leaveTimer.current);
      if (!skill) {
        leaveTimer.current = setTimeout(resetPreview, LEAVE_DELAY_MS);
        return;
      }
      if (previewedRef.current !== skill) {
        clearTimeout(revealTimer.current);
        revealTimer.current = setTimeout(() => setRevealedPreview(skill), REVEAL_DELAY_MS);
      }
      previewedRef.current = skill;
      setPreviewed(skill);
    },
    [resetPreview],
  );

  const togglePin = useCallback(
    (skill: SkillId) => {
      // Drop the preview so unpinning visibly returns to the default state.
      resetPreview();
      setPinned((current) => (current === skill ? null : skill));
    },
    [resetPreview],
  );

  const clear = useCallback(() => {
    resetPreview();
    setPinned(null);
  }, [resetPreview]);

  const value = useMemo(() => {
    const revealed = previewed && revealedPreview === previewed ? previewed : pinned;
    return { active: previewed ?? pinned, revealed, pinned, preview, togglePin, clear };
  }, [previewed, revealedPreview, pinned, preview, togglePin, clear]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useSkillSelection(): SkillSelection {
  const value = useContext(Context);
  if (!value) throw new Error('useSkillSelection must be used inside SkillSelectionProvider');
  return value;
}
