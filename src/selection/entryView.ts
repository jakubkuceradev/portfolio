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
 * The single rule for how an entry presents itself given the active skill and
 * whether the visitor expanded it.
 */
export function entryView(entry: Entry, active: SkillId | null, expanded: boolean): EntryView {
  const related = active !== null && entryMatches(entry, active);
  const emphasis: Emphasis = active === null ? 'neutral' : related ? 'related' : 'dimmed';
  const all = entry.bullets.map((bullet) => ({
    bullet,
    highlighted: active !== null && bullet.skills.includes(active),
  }));
  const bullets = expanded ? all : all.filter((b) => b.highlighted);
  return { emphasis, bullets, hasMore: bullets.length < all.length };
}
