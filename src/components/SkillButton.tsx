import type { PointerEvent } from 'react';
import type { Skill } from '../content';
import { useSkillSelection } from '../selection/SkillSelection';
import classes from './SkillsPanel.module.css';

export function SkillButton({ skill }: { skill: Skill }) {
  const { active, pinned, preview, togglePin } = useSkillSelection();
  const isPinned = pinned === skill.id;
  // Hover previews only for real mouse pointers; touch relies on tapping (pin).
  const isMouse = (e: PointerEvent) => e.pointerType === 'mouse';
  return (
    <button
      type="button"
      className={classes.skill}
      aria-pressed={isPinned}
      data-active={active === skill.id || undefined}
      onPointerEnter={(e) => isMouse(e) && preview(skill.id)}
      onPointerLeave={(e) => isMouse(e) && preview(null)}
      onFocus={() => preview(skill.id)}
      onBlur={() => preview(null)}
      onClick={() => togglePin(skill.id)}
    >
      <span>{skill.label}</span>
      {isPinned && (
        <span className={classes.pinTag} aria-hidden="true">
          Pinned
        </span>
      )}
    </button>
  );
}
