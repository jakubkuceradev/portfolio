import { useDisclosure } from '@mantine/hooks';
import { type MouseEvent, useId, useMemo, useState } from 'react';
import type { Entry } from '../content';
import { useSkillSelection } from '../selection/SkillSelection';
import { entryView, type EntryView } from '../selection/entryView';
import { ExternalLink } from './ExternalLink';
import classes from './EntryCard.module.css';

export function EntryCard({ entry }: { entry: Entry }) {
  const { active, revealed } = useSkillSelection();
  const [expanded, { toggle }] = useDisclosure(false);
  const view = useMemo(() => entryView(entry, active, revealed, expanded), [entry, active, revealed, expanded]);
  const open = view.bullets.length > 0;
  const shown = useRetainedBullets(view.bullets);
  const bulletsId = useId();

  // Mouse users can click anywhere on the entry; the title button carries the
  // semantics for keyboard and screen readers. Links and text selection are left alone.
  const onRowClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button')) return;
    if (window.getSelection()?.toString()) return;
    toggle();
  };

  return (
    <article className={classes.entry} data-emphasis={view.emphasis} data-expanded={expanded || undefined} onClick={onRowClick}>
      <header className={classes.head}>
        <h3 className={classes.heading}>
          <button
            type="button"
            className={classes.toggle}
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls={bulletsId}
          >
            <span className={classes.title}>{entry.title}</span>
            <span className={classes.context}>{entry.context}</span>
          </button>
        </h3>
        {entry.href && (
          <ExternalLink href={entry.href} className={classes.external}>
            <span aria-hidden="true">↗</span>
            <span className="visually-hidden">{entry.title} on GitHub</span>
          </ExternalLink>
        )}
        <span className={classes.date}>{entry.date}</span>
        <span className={classes.indicator} aria-hidden="true">
          {expanded ? '−' : '+'}
        </span>
      </header>

      {entry.summary && <p className={classes.summary}>{entry.summary}</p>}

      {/* Height animates via grid rows; closed content is inert and hidden from assistive tech. */}
      <div id={bulletsId} className={classes.reveal} data-open={open || undefined} inert={!open} aria-hidden={!open}>
        <div className={classes.revealInner}>
          <ul className={classes.bullets}>
            {shown.map(({ bullet, highlighted }) => (
              <li key={bullet.text} className={classes.bullet} data-highlighted={highlighted || undefined}>
                {bullet.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

/**
 * Keeps the last non-empty bullet list while the reveal animates closed, so
 * the content doesn't vanish before the height transition runs.
 */
function useRetainedBullets(bullets: EntryView['bullets']) {
  const [retained, setRetained] = useState(bullets);
  const key = (list: EntryView['bullets']) => list.map((b) => `${b.bullet.text}:${b.highlighted}`).join('|');
  if (bullets.length > 0 && key(bullets) !== key(retained)) setRetained(bullets);
  return bullets.length > 0 ? bullets : retained;
}
