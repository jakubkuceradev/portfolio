import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';

const article = (title: RegExp) => screen.getByRole('heading', { level: 3, name: title }).closest('article')!;
const skill = (name: string) => screen.getByRole('button', { name });
const bulletTexts = (el: HTMLElement) => within(el).queryAllByRole('listitem').map((li) => li.textContent);

describe('skill-evidence interaction', () => {
  it('starts compact (A2)', () => {
    render(<App />);
    expect(bulletTexts(article(/Software Engineer/))).toEqual([]);
    expect(article(/Software Engineer/)).toHaveAttribute('data-emphasis', 'neutral');
  });

  it('hover previews a skill and leaving restores the default (A3)', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);
    await user.hover(skill('Docker'));
    expect(bulletTexts(article(/Software Engineer/))).toEqual([expect.stringMatching(/Docker/)]);
    expect(article(/Software Engineer/)).toHaveAttribute('data-emphasis', 'related');
    expect(article(/Winning Team Member/)).toHaveAttribute('data-emphasis', 'dimmed');

    await user.unhover(skill('Docker'));
    await act(() => vi.advanceTimersByTimeAsync(200));
    expect(article(/Software Engineer/)).toHaveAttribute('data-emphasis', 'neutral');
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

  it('reads full bullets without choosing a skill (A7)', async () => {
    const user = userEvent.setup();
    render(<App />);
    const entry = article(/Winning Team Member/);
    await user.click(within(entry).getByRole('button', { name: /Show details/ }));
    await waitFor(() => expect(bulletTexts(entry)).toHaveLength(4));
    expect(within(entry).getByRole('button', { name: /Hide details/ })).toHaveAttribute('aria-expanded', 'true');
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
