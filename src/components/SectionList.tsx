import { sections } from '../content';
import { EntryCard } from './EntryCard';
import classes from './SectionList.module.css';

export function SectionList() {
  return sections.map((section) => (
    <section key={section.id} className={classes.section} aria-labelledby={`section-${section.id}`}>
      <h2 id={`section-${section.id}`} className={classes.title}>
        {section.title}
      </h2>
      <div className={classes.entries}>
        {section.entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  ));
}
