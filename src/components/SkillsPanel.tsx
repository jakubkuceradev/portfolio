import { useEffect, useRef, useState } from 'react';
import { skillById, skillGroups, skills, type SkillId } from '../content';
import { useSkillSelection } from '../selection/SkillSelection';
import { SkillButton } from './SkillButton';
import ui from './ui.module.css';
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
    <div className={`${ui.panel} ${classes.panel}`}>
      <div className={`${ui.panelHeading} ${classes.heading}`}>
        <div>
          <span className={ui.eyebrow}>01 / Skills</span>
          <h2 id="skills-heading" className={ui.tagline}>
            Evidence, not keywords.
          </h2>
        </div>
        <p className={classes.hint}>Hover to preview, click to pin.</p>
        <button
          type="button"
          className={`${ui.textLink} ${classes.clear}`}
          onClick={clear}
          hidden={!pinned}
        >
          Clear ×<span className="visually-hidden"> selected skill</span>
        </button>
      </div>

      {skillGroups.map((group) => (
        <section key={group} className={classes.group} aria-labelledby={`skills-${slug(group)}`}>
          <h3 id={`skills-${slug(group)}`} className={`${ui.label} ${classes.groupTitle}`}>
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

      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}

/** Announces pin changes (not previews) so screen-reader users hear the result of a selection. */
function usePinAnnouncement(pinned: SkillId | null) {
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
