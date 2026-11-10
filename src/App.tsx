import { HeadlessMantineProvider } from '@mantine/core';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { PinnedBar } from './components/PinnedBar';
import { SectionList } from './components/SectionList';
import { SkillsPanel } from './components/SkillsPanel';
import { SkillSelectionProvider } from './selection/SkillSelection';
import classes from './App.module.css';

export function App() {
  return (
    <HeadlessMantineProvider theme={{ respectReducedMotion: true }}>
      <SkillSelectionProvider>
        <a className={classes.skipLink} href="#experience">
          Skip to experience
        </a>
        <PinnedBar />
        <main className={classes.page}>
          <Hero />
          <div className={classes.layout}>
            <aside className={classes.skills} aria-labelledby="skills-heading">
              <SkillsPanel />
            </aside>
            <div className={classes.sections}>
              <SectionList />
            </div>
          </div>
        </main>
        <Footer />
      </SkillSelectionProvider>
    </HeadlessMantineProvider>
  );
}
