import { HeadlessMantineProvider } from '@mantine/core';
import { Header } from './components/Header';
import { PinnedBar } from './components/PinnedBar';
import { SectionList } from './components/SectionList';
import { SkillsPanel } from './components/SkillsPanel';
import { SkillSelectionProvider } from './selection/SkillSelection';
import classes from './App.module.css';

export function App() {
  return (
    <HeadlessMantineProvider theme={{ respectReducedMotion: true }}>
      <SkillSelectionProvider>
        <div className={classes.page}>
          <Header />
          <PinnedBar />
          <div className={classes.layout}>
            <aside className={classes.skills} aria-labelledby="skills-heading">
              <SkillsPanel />
            </aside>
            <main className={classes.main}>
              <SectionList />
            </main>
          </div>
        </div>
      </SkillSelectionProvider>
    </HeadlessMantineProvider>
  );
}
