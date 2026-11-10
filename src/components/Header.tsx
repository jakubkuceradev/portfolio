import { profile } from '../content';
import { useTheme } from '../theme/useTheme';
import { ExternalLink } from './ExternalLink';
import classes from './Header.module.css';

export function Header() {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <header className={classes.header}>
      <div className={classes.identity}>
        <h1 className={classes.name}>{profile.name}</h1>
        <p className={classes.role}>{profile.role}</p>
        <p className={classes.intro}>{profile.intro}</p>
        <ul className={classes.links} aria-label="Contact">
          {profile.links.map((link) => (
            <li key={link.label}>
              <ExternalLink href={link.href} className={classes.link}>
                <span className={classes.linkLabel}>{link.label}</span> {link.text}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
      <button type="button" className={classes.themeToggle} onClick={toggle} aria-label={`Switch to ${next} theme`}>
        <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
      </button>
    </header>
  );
}
