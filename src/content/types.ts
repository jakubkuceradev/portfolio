import type { SkillId } from './skills';

export type Bullet = {
  text: string;
  /** At least one skill this bullet demonstrates. */
  skills: readonly [SkillId, ...SkillId[]];
};

export type Entry = {
  /** Unique across all sections. */
  id: string;
  title: string;
  /** Organization, school or project context. */
  context: string;
  date: string;
  summary?: string;
  /** External link (opens in a new tab). */
  href?: string;
  /** Sample content waiting to be replaced. */
  placeholder?: true;
  bullets: readonly Bullet[];
};

export type SectionId = 'experience' | 'projects' | 'coursework';

export type Section = {
  id: SectionId;
  title: string;
  entries: readonly Entry[];
};
