import { describe, expect, it } from 'vitest';
import type { Entry } from '../content';
import { entryView } from './entryView';

const entry: Entry = {
  id: 'e',
  title: 'T',
  context: 'C',
  date: '2025',
  bullets: [
    { text: 'a', skills: ['python'] },
    { text: 'b', skills: ['react'] },
    { text: 'c', skills: ['python', 'docker'] },
  ],
};
const texts = (v: ReturnType<typeof entryView>) => v.bullets.map((b) => b.bullet.text);

describe('entryView', () => {
  it('is compact with no skill active (A2)', () => {
    const v = entryView(entry, null, null, false);
    expect(v).toMatchObject({ emphasis: 'neutral', hasMore: true });
    expect(texts(v)).toEqual([]);
  });

  it('shows every bullet when expanded without a skill (A7)', () => {
    const v = entryView(entry, null, null, true);
    expect(texts(v)).toEqual(['a', 'b', 'c']);
    expect(v.bullets.some((b) => b.highlighted)).toBe(false);
    expect(v.hasMore).toBe(false);
  });

  it('shows only matching bullets of a related entry, highlighted', () => {
    const v = entryView(entry, 'python', 'python', false);
    expect(v.emphasis).toBe('related');
    expect(texts(v)).toEqual(['a', 'c']);
    expect(v.bullets.every((b) => b.highlighted)).toBe(true);
    expect(v.hasMore).toBe(true);
  });

  it('shows all bullets of an expanded related entry with matches highlighted', () => {
    const v = entryView(entry, 'python', 'python', true);
    expect(v.bullets.map((b) => b.highlighted)).toEqual([true, false, true]);
  });

  it('emphasises an unrevealed preview without expanding anything', () => {
    const v = entryView(entry, 'python', null, false);
    expect(v.emphasis).toBe('related');
    expect(texts(v)).toEqual([]);
  });

  it('keeps the revealed skill bullets while another skill is previewed', () => {
    const v = entryView(entry, 'sql', 'react', false);
    expect(v.emphasis).toBe('dimmed');
    expect(texts(v)).toEqual(['b']);
  });

  it('dims unrelated entries and keeps them compact', () => {
    const v = entryView(entry, 'sql', 'sql', false);
    expect(v.emphasis).toBe('dimmed');
    expect(texts(v)).toEqual([]);
  });
});
