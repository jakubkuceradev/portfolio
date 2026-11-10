import { useDisclosure } from '@mantine/hooks';
import { useId, useMemo, useState } from 'react';
import type { Entry } from '../content';
import { useSkillSelection } from '../selection/SkillSelection';
import { entryView, type EntryView } from '../selection/entryView';
import { ExternalLink } from './ExternalLink';
import ui from './ui.module.css';
import classes from './EntryCard.module.css';

export function EntryCard({ entry }: { entry: Entry }) {
  const { active, revealed } = useSkillSelection();
  const [expanded, { toggle }] = useDisclosure(false);
  const view = useMemo(() => entryView(entry, active, revealed, expanded), [entry, active, revealed, expanded]);
  const open = view.bullets.length > 0;
  const shown = useRetainedBullets(view.bullets);
  const bulletsId = useId();

  return (
    <article className={classes.entry} data-emphasis={view.emphasis}>
      <header className={classes.head}>
        <h3 className={classes.title}>
          {entry.href ? (
            <ExternalLink href={entry.href} className={classes.titleLink}>
              {entry.title}
              <span className={classes.arrow} aria-hidden="true">
                ↗
              </span>
            </ExternalLink>
          ) : (
            entry.title
          )}
        </h3>
        <p className={classes.date}>{entry.date}</p>
        <p className={classes.context}>{entry.context}</p>
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

      {(view.hasMore || expanded) && (
        <button
          type="button"
          className={`${ui.textLink} ${classes.toggle}`}
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={bulletsId}
        >
          {expanded ? '− Hide details' : open ? '+ All details' : '+ Details'}
          <span className="visually-hidden"> for {entry.title}</span>
        </button>
      )}
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
