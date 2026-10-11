import type { CSSProperties } from 'react';
import type { Project } from '../../types/project.types';
import styles from './SphereCard.module.css';

interface SphereCardProps {
  project: Project;
  index: number;
  total: number;
  radius: number;
  onSelect: (project: Project) => void;
}

export function SphereCard({ project, index, total, radius, onSelect }: SphereCardProps) {
  const position = getPosition(index, total, radius);
  const style = {
    '--x': `${position.x}px`,
    '--y': `${position.y}px`,
    '--z': `${position.z}px`,
    '--rotate-y': `${position.rotateY}deg`,
    '--rotate-x': `${position.rotateX}deg`,
    '--accent': project.accent,
    '--card-index': index,
  } as CSSProperties;

  return (
    <button
      className={styles.card}
      style={style}
      type="button"
      aria-label={`View project ${project.title}`}
      onClick={() => onSelect(project)}
    >
      <span className={styles.imageWrap}>
        <img className={styles.image} src={project.image} alt="" loading="lazy" draggable={false} />
        <span className={styles.imageShade} />
        <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
      </span>
      <span className={styles.cardInfo}>
        <span className={styles.category}>{project.category}</span>
        <span className={styles.title}>{project.title}</span>
        <span className={styles.year}>{project.year}</span>
      </span>
    </button>
  );
}

import { getSpherePosition as getPosition } from './sphere.utils';
