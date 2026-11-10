import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { REVEAL_DELAY_MS } from './selection/SkillSelection';

const article = (title: RegExp) => screen.getByRole('heading', { level: 3, name: title }).closest('article')!;
const skill = (name: string) => screen.getByRole('button', { name });
const bulletTexts = (el: HTMLElement) => within(el).queryAllByRole('listitem').map((li) => li.textContent);

describe('skill-evidence interaction', () => {
  it('starts compact (A2)', () => {
    render(<App />);
    expect(bulletTexts(article(/Software Engineer/))).toEqual([]);
    expect(article(/Software Engineer/)).toHaveAttribute('data-emphasis', 'neutral');
  });

  it('hover emphasises at once, expands only after a dwell, and leaving restores (A3)', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);
    await user.hover(skill('Docker'));
    expect(article(/Software Engineer/)).toHaveAttribute('data-emphasis', 'related');
    expect(article(/Winning Team Member/)).toHaveAttribute('data-emphasis', 'dimmed');
    expect(bulletTexts(article(/Software Engineer/))).toEqual([]);

    await act(() => vi.advanceTimersByTimeAsync(REVEAL_DELAY_MS));
    expect(bulletTexts(article(/Software Engineer/))).toEqual([expect.stringMatching(/Docker/)]);

    await user.unhover(skill('Docker'));
    await act(() => vi.advanceTimersByTimeAsync(200));
    expect(article(/Software Engineer/)).toHaveAttribute('data-emphasis', 'neutral');
    expect(bulletTexts(article(/Software Engineer/))).toEqual([]);
    vi.useRealTimers();
  });

  it('a passing hover never expands anything', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);
    await user.hover(skill('Docker'));
    await act(() => vi.advanceTimersByTimeAsync(REVEAL_DELAY_MS / 2));
    await user.unhover(skill('Docker'));
    await act(() => vi.advanceTimersByTimeAsync(REVEAL_DELAY_MS * 2));
    expect(bulletTexts(article(/Software Engineer/))).toEqual([]);
    vi.useRealTimers();
  });

  it('click pins into the URL; clicking again or Clear unpins (A4)', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'SQL' }));
    expect(screen.getByRole('button', { name: 'SQL', pressed: true })).toBeInTheDocument();
    expect(window.location.search).toBe('?skill=sql');

    await user.click(screen.getByRole('button', { name: 'SQL' }));
    expect(window.location.search).toBe('');

    await user.click(screen.getByRole('button', { name: 'SQL' }));
    await user.click(screen.getAllByRole('button', { name: /Clear/ })[0]!);
    expect(window.location.search).toBe('');
    expect(screen.getByRole('button', { name: 'SQL', pressed: false })).toBeInTheDocument();
  });

  it('restores a pinned skill from ?skill= and ignores unknown values (A4)', () => {
    window.history.replaceState(null, '', '/?skill=react');
    render(<App />);
    expect(screen.getByRole('button', { name: 'React', pressed: true })).toBeInTheDocument();
    expect(article(/Software Engineer/)).toHaveAttribute('data-emphasis', 'related');
  });

  it('drops an unknown ?skill= value', () => {
    window.history.replaceState(null, '', '/?skill=cobol&x=1');
    render(<App />);
    expect(screen.queryAllByRole('button', { pressed: true })).toEqual([]);
    expect(window.location.search).toBe('?x=1');
  });

  it('works by keyboard alone: focus previews, Enter pins, Escape clears (A5)', async () => {
    const user = userEvent.setup();
    render(<App />);
    const python = screen.getByRole('button', { name: 'Python' });
    act(() => python.focus());
    expect(article(/Software Engineer/)).toHaveAttribute('data-emphasis', 'related');
    await user.keyboard('{Enter}');
    expect(window.location.search).toBe('?skill=python');
    await user.tab();
    expect(article(/Software Engineer/)).toHaveAttribute('data-emphasis', 'related');
    await user.keyboard('{Escape}');
    expect(window.location.search).toBe('');
  });

  it('reads full bullets without choosing a skill via the title button (A7)', async () => {
    const user = userEvent.setup();
    render(<App />);
    const entry = article(/Winning Team Member/);
    const toggle = within(entry).getByRole('button', { name: /Winning Team Member/ });
    await user.click(toggle);
    expect(bulletTexts(entry)).toHaveLength(4);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await user.click(toggle);
    expect(bulletTexts(entry)).toEqual([]);
  });

  it('toggles an entry when clicking anywhere on the row, but not on its link', async () => {
    const user = userEvent.setup();
    render(<App />);
    const entry = article(/AI Agents for Farkle/);
    await user.click(within(entry).getByText(/multi-agent environment for the Farkle/));
    expect(bulletTexts(entry)).toHaveLength(3);
    await user.click(within(entry).getByRole('link'));
    expect(bulletTexts(entry)).toHaveLength(3);
  });
});

describe('theme', () => {
  it('persists the chosen theme across a reload (A8)', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    unmount();
    delete document.documentElement.dataset.theme;
    render(<App />);
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
