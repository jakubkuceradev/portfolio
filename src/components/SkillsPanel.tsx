import { useEffect, useRef, useState } from 'react';
import { profile, skillById, skillGroups, skills } from '../content';
import { useSkillSelection } from '../selection/SkillSelection';
import { SkillButton } from './SkillButton';
import classes from './SkillsPanel.module.css';

export function SkillsPanel() {
  const { pinned, clear } = useSkillSelection();
  const announcement = usePinAnnouncement(pinned);

  // Escape clears the pinned skill from anywhere on the page.
  useEffect(() => {
    if (!pinned) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') clear();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [pinned, clear]);

  return (
    <div className={classes.panel}>
      <div className={classes.heading}>
        <h2 id="skills-heading" className={classes.title}>
          Skills
        </h2>
        {pinned && (
          <button type="button" className={classes.clear} onClick={clear}>
            Clear<span className="visually-hidden"> selected skill</span>
          </button>
        )}
      </div>
      <p className={classes.hint}>Pick a skill to see where I used it.</p>

      {skillGroups.map((group) => (
        <section key={group} className={classes.group} aria-labelledby={`skills-${slug(group)}`}>
          <h3 id={`skills-${slug(group)}`} className={classes.groupTitle}>
            {group}
          </h3>
          <ul className={classes.list}>
            {skills
              .filter((s) => s.group === group)
              .map((s) => (
                <li key={s.id}>
                  <SkillButton skill={s} />
                </li>
              ))}
          </ul>
        </section>
      ))}

      <section className={classes.group} aria-labelledby="skills-spoken">
        <h3 id="skills-spoken" className={classes.groupTitle}>
          Spoken languages
        </h3>
        <ul className={classes.plainList}>
          {profile.spokenLanguages.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </section>

      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}

/** Announces pin changes (not previews) so screen-reader users hear the result of a selection. */
function usePinAnnouncement(pinned: ReturnType<typeof useSkillSelection>['pinned']) {
  const [message, setMessage] = useState('');
  const previous = useRef(pinned);
  useEffect(() => {
    if (previous.current === pinned) return;
    previous.current = pinned;
    setMessage(pinned ? `Showing evidence for ${skillById(pinned).label}` : 'Skill selection cleared');
  }, [pinned]);
  return message;
}

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
