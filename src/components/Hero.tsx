import { profile } from '../content';
import { ExternalLink } from './ExternalLink';
import { ThemeToggle } from './ThemeToggle';
import ui from './ui.module.css';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <section className={classes.hero} id="top" aria-labelledby="hero-name">
      <div className={classes.top}>
        <p className={ui.eyebrowAccent}>{profile.role}</p>
        <ThemeToggle />
      </div>
      <h1 id="hero-name" className={classes.name}>
        {profile.name}
      </h1>
      <p className={classes.intro}>{profile.intro}</p>

      <div className={classes.actions}>
        <a className={ui.buttonPrimary} href={`mailto:${profile.email}`}>
          {profile.email}
          <span aria-hidden="true">↗</span>
        </a>
        {profile.links.map((link) => (
          <ExternalLink key={link.label} href={link.href} className={ui.button}>
            {link.label}
            <span aria-hidden="true">↗</span>
          </ExternalLink>
        ))}
      </div>

      <dl className={`${ui.panel} ${classes.facts}`}>
        {profile.facts.map((fact) => (
          <div key={fact.label} className={classes.fact}>
            <dt className={ui.label}>{fact.label}</dt>
            <dd className={classes.factValue}>{fact.value}</dd>
            <dd className={classes.factNote}>{fact.note}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
