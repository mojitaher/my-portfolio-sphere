import { useEffect } from 'react';
import type { Project } from '../../types/project.types';
import styles from './ProjectModal.module.css'

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className={styles.backdrop} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="project-title">
        <button className={styles.close} type="button" onClick={onClose} aria-label="Close project details">×</button>
        <img className={styles.cover} src={project.image} alt={`${project.title} preview`} />
        <div className={styles.content}>
          <p className={styles.eyebrow}>{project.category} <span>·</span> {project.year}</p>
          <h2 id="project-title">{project.title}</h2>
          <p className={styles.description}>{project.description}</p>
          <ul className={styles.tags} aria-label="Technologies">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <div className={styles.actions}>
            {project.liveUrl !== '#' && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}
            {project.sourceUrl !== '#' && <a href={project.sourceUrl} target="_blank" rel="noreferrer">Source code ↗</a>}
            {project.liveUrl === '#' && project.sourceUrl === '#' && <p className={styles.placeholder}>Add your demo and repository URLs in src/data/projects.ts</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
