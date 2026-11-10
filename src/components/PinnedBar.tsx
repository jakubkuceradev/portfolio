import { skillById } from '../content';
import { useSkillSelection } from '../selection/SkillSelection';
import ui from './ui.module.css';
import classes from './PinnedBar.module.css';

/** Narrow screens only: keeps the pinned skill visible and clearable while scrolling. */
export function PinnedBar() {
  const { pinned, clear } = useSkillSelection();
  if (!pinned) return null;
  return (
    <div className={classes.bar}>
      <span className={classes.text}>
        <span className={ui.label}>Showing</span> {skillById(pinned).label}
      </span>
      <button type="button" className={ui.textLink} onClick={clear}>
        Clear ×<span className="visually-hidden"> selected skill</span>
      </button>
    </div>
  );
}
