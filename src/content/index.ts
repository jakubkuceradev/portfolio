import { coursework } from './coursework';
import { experience } from './experience';
import { projects } from './projects';
import { skills, skillGroups, type Skill, type SkillId } from './skills';
import type { Entry, Section } from './types';

export { profile } from './profile';
export { skills, skillGroups };
export type { Skill, SkillId, SkillGroup } from './skills';
export type { Bullet, Entry, Section, SectionId } from './types';

export const sections: readonly Section[] = [
  { id: 'experience', title: 'Experience', entries: experience },
  { id: 'projects', title: 'Projects', entries: projects },
  { id: 'coursework', title: 'Coursework', entries: coursework },
];

const byId = new Map<string, Skill>(skills.map((s) => [s.id, s]));

export function isSkillId(value: unknown): value is SkillId {
  return typeof value === 'string' && byId.has(value);
}

export function skillById(id: SkillId): Skill {
  return byId.get(id)!;
}

export function entryMatches(entry: Entry, skill: SkillId): boolean {
  return entry.bullets.some((b) => b.skills.includes(skill));
}
