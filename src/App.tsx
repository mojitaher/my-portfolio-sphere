import { useCallback, useState } from 'react';
import type { Project } from './types/project.types';
import { projects } from './data/projects';
import  ProjectSphere from './components/sphere/ProjectSphere';
import { ProjectModal } from './components/sections/ProjectModal';
import styles from './styles/App.module.css';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.wordmark} href="#top" aria-label="Home">MT<span>.</span></a>
        <p className={styles.headerLabel}>FRONTEND DEVELOPER <span>·</span> PORTFOLIO</p>
        <a className={styles.contactLink} href="mailto:hello@example.com">LET'S TALK <span>↗</span></a>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.intro}>
          <p className={styles.kicker}><span className={styles.statusDot} /> AVAILABLE FOR OPPORTUNITIES</p>
          <h1>Selected work<span className={styles.period}>.</span></h1>
          <p className={styles.subtitle}>Interfaces built with care, curiosity and a little motion.</p>
        </div>
        <div className={styles.counter}><strong>{String(projects.length).padStart(2, '0')}</strong><span>PROJECTS<br />IN ORBIT</span></div>
      </section>

      <section className={styles.experience} aria-label="Interactive project gallery">
        <ProjectSphere projects={projects} onSelect={setSelectedProject} />
        <p className={styles.hint}><span className={styles.dragIcon}>↔</span> DRAG TO EXPLORE <span className={styles.hintDivider}>/</span> SELECT A PROJECT</p>
      </section>

      <footer className={styles.footer}>
        <span>DESIGNED & BUILT WITH REACT + GSAP</span>
        <span>© {new Date().getFullYear()} — MOJTABA TAHERKHANI</span>
        <a href="https://github.com/mojitaher" target="_blank" rel="noreferrer">GITHUB ↗</a>
      </footer>
      <ProjectModal project={selectedProject} onClose={closeProject} />
    </main>
  );
}
