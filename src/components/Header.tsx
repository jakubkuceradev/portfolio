import { profile, sections } from '../content';
import { useTheme } from '../theme/useTheme';
import classes from './Header.module.css';

export function Header() {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <header className={classes.header}>
      <a className={classes.brand} href="#top" aria-label={`${profile.name}, back to top`}>
        {profile.handle}
        <span className={classes.cursor} aria-hidden="true">
          _
        </span>
      </a>
      <nav className={classes.nav} aria-label="Sections">
        <a href="#skills-heading">Skills</a>
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.title}
          </a>
        ))}
      </nav>
      <button type="button" className={classes.themeToggle} onClick={toggle} aria-label={`Switch to ${next} theme`}>
        <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
      </button>
    </header>
  );
}
