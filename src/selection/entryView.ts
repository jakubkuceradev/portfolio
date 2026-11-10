import { entryMatches, type Bullet, type Entry, type SkillId } from '../content';

export type Emphasis = 'neutral' | 'related' | 'dimmed';

export type EntryView = {
  emphasis: Emphasis;
  /** Bullets to show, in content order. Empty means the entry is compact. */
  bullets: { bullet: Bullet; highlighted: boolean }[];
  /** Whether some bullets are hidden that "show details" would reveal. */
  hasMore: boolean;
};

/**
 * The single rule for how an entry presents itself.
 *
 * - `active` drives emphasis and bullet highlighting (changes instantly on hover).
 * - `revealed` decides which bullets a collapsed entry expands to show (changes
 *   only after a dwell or a pin, so passing hovers don't shift layout).
 * - `expanded` is the visitor's own "show details" toggle.
 */
export function entryView(
  entry: Entry,
  active: SkillId | null,
  revealed: SkillId | null,
  expanded: boolean,
): EntryView {
  const related = active !== null && entryMatches(entry, active);
  const emphasis: Emphasis = active === null ? 'neutral' : related ? 'related' : 'dimmed';
  const all = entry.bullets.map((bullet) => ({
    bullet,
    highlighted: active !== null && bullet.skills.includes(active),
  }));
  const bullets = expanded ? all : all.filter((b) => revealed !== null && b.bullet.skills.includes(revealed));
  return { emphasis, bullets, hasMore: bullets.length < all.length };
}
