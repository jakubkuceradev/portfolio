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
      <h2 id={`section-${section.id}`} className={`${ui.eyebrow} ${ui.panelTitle}`}>
        <span aria-hidden="true">{String(index + 2).padStart(2, '0')} / </span>
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
