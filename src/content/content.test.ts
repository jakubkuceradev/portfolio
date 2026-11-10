import { describe, expect, it } from 'vitest';
import { isSkillId, sections, skills } from './index';

const entries = sections.flatMap((s) => s.entries);
const bullets = entries.flatMap((e) => e.bullets);

describe('content integrity', () => {
  it('gives every skill at least one tagged bullet', () => {
    const used = new Set(bullets.flatMap((b) => b.skills));
    const unused = skills.filter((s) => !used.has(s.id)).map((s) => s.id);
    expect(unused).toEqual([]);
  });

  it('tags every bullet with at least one existing skill', () => {
    const bad = bullets.filter((b) => b.skills.length === 0 || !b.skills.every(isSkillId));
    expect(bad).toEqual([]);
  });

  it('has unique skill and entry ids', () => {
    const skillIds = skills.map((s) => s.id);
    const entryIds = entries.map((e) => e.id);
    expect(new Set(skillIds).size).toBe(skillIds.length);
    expect(new Set(entryIds).size).toBe(entryIds.length);
  });

  it('marks all coursework as placeholder', () => {
    const coursework = sections.find((s) => s.id === 'coursework')!;
    expect(coursework.entries.every((e) => e.placeholder)).toBe(true);
  });
});
