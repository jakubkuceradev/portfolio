import { skillById } from '../content';
import { useSkillSelection } from '../selection/SkillSelection';
import classes from './PinnedBar.module.css';

/** Narrow screens only: keeps the pinned skill visible and clearable while scrolling. */
export function PinnedBar() {
  const { pinned, clear } = useSkillSelection();
  if (!pinned) return null;
  return (
    <div className={classes.bar}>
      <span>
        Showing <strong>{skillById(pinned).label}</strong>
      </span>
      <button type="button" className={classes.clear} onClick={clear}>
        Clear<span className="visually-hidden"> selected skill</span>
      </button>
    </div>
  );
}
