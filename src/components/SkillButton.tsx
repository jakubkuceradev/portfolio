import type { PointerEvent } from 'react';
import type { Skill } from '../content';
import { useSkillSelection } from '../selection/SkillSelection';
import classes from './SkillButton.module.css';

export function SkillButton({ skill }: { skill: Skill }) {
  const { active, pinned, preview, togglePin } = useSkillSelection();
  // Hover previews only for real mouse pointers; touch relies on tapping (pin).
  const isMouse = (e: PointerEvent) => e.pointerType === 'mouse';
  return (
    <button
      type="button"
      className={classes.skill}
      aria-pressed={pinned === skill.id}
      data-active={active === skill.id || undefined}
      onPointerEnter={(e) => isMouse(e) && preview(skill.id)}
      onPointerLeave={(e) => isMouse(e) && preview(null)}
      onFocus={() => preview(skill.id)}
      onBlur={() => preview(null)}
      onClick={() => togglePin(skill.id)}
    >
      {skill.label}
    </button>
  );
}
