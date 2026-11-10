import { profile } from '../content';
import { ExternalLink } from './ExternalLink';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <footer className={classes.footer}>
      <span className={classes.name}>{profile.name}</span>
      <nav className={classes.links} aria-label="Contact">
        <a href={`mailto:${profile.email}`}>Email</a>
        {profile.links.map((link) => (
          <ExternalLink key={link.label} href={link.href}>
            {link.label}
          </ExternalLink>
        ))}
      </nav>
    </footer>
  );
}
