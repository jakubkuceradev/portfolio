import { sections } from '../content';
import { EntryCard } from './EntryCard';
import ui from './ui.module.css';
import classes from './SectionList.module.css';

export function SectionList() {
  return sections.map((section, index) => (
    <section
      key={section.id}
      id={section.id}
      className={`${ui.panel} ${classes.section}`}
      aria-labelledby={`section-${section.id}`}
    >
      <div className={ui.panelHeading}>
        <span className={ui.eyebrow}>
          {String(index + 2).padStart(2, '0')} / {section.title}
        </span>
        <h2 id={`section-${section.id}`} className={ui.tagline}>
          <span className="visually-hidden">{section.title}: </span>
          {section.tagline}
        </h2>
      </div>
      <div className={classes.entries}>
        {section.entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  ));
}
