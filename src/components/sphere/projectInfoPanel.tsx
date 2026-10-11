
import type { CSSProperties } from 'react';
import type { Project } from '../../types/project.types';
import styles from './ProjectInfoPanel.module.css';

interface ProjectInfoPanelProps {
  project: Project;
  position: {
    x: number;
    y: number;
  };
  onClose?: () => void;
}
interface TechnologyInfo {
  icon: string;
  url: string;
}

const TECHNOLOGIES: Record<string, TechnologyInfo> = {
  react: {
    icon: 'https://cdn.simpleicons.org/react/61DAFB',
    url: 'https://react.dev/',
  },
  'react.js': {
    icon: 'https://cdn.simpleicons.org/react/61DAFB',
    url: 'https://react.dev/',
  },
  typescript: {
    icon: 'https://cdn.simpleicons.org/typescript/3178C6',
    url: 'https://www.typescriptlang.org/',
  },
  javascript: {
    icon: 'https://cdn.simpleicons.org/javascript/F7DF1E',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  js: {
    icon: 'https://cdn.simpleicons.org/javascript/F7DF1E',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  vite: {
    icon: 'https://cdn.simpleicons.org/vite/646CFF',
    url: 'https://vite.dev/',
  },
  tailwind: {
    icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    url: 'https://tailwindcss.com/',
  },
  tailwindcss: {
    icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    url: 'https://tailwindcss.com/',
  },
  css: {
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
},
css3: {
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
},
  html: {
    icon: 'https://cdn.simpleicons.org/html5/E34F26',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  },
  html5: {
    icon: 'https://cdn.simpleicons.org/html5/E34F26',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  },
  gsap: {
    icon: 'https://cdn.simpleicons.org/greensock/88CE02',
    url: 'https://gsap.com/',
  },
  github: {
    icon: 'https://cdn.simpleicons.org/github/FFFFFF',
    url: 'https://github.com/',
  },
  git: {
    icon: 'https://cdn.simpleicons.org/git/F05032',
    url: 'https://git-scm.com/',
  },
  redux: {
    icon: 'https://cdn.simpleicons.org/redux/764ABC',
    url: 'https://redux.js.org/',
  },
  zustand: {
    icon: 'https://cdn.simpleicons.org/zustand/443E38',
    url: 'https://zustand-demo.pmnd.rs/',
  },
  'react query': {
    icon: 'https://cdn.simpleicons.org/tanstack/FF4154',
    url: 'https://tanstack.com/query/latest',
  },
  tanstack: {
    icon: 'https://cdn.simpleicons.org/tanstack/FF4154',
    url: 'https://tanstack.com/',
  },
  'react router': {
    icon: 'https://cdn.simpleicons.org/reactrouter/CA4245',
    url: 'https://reactrouter.com/',
  },
  'next.js': {
  icon: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF',
  url: 'https://nextjs.org/',
},
nextjs: {
  icon: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF',
  url: 'https://nextjs.org/',
},
next: {
  icon: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF',
  url: 'https://nextjs.org/',
},
linkedin: {
  icon: 'https://cdn.simpleicons.org/linkedin/0A66C2',
  url: 'https://www.linkedin.com/',
},
};

function getTechnologyInfo(
  technology: string,
): TechnologyInfo | undefined {
  return TECHNOLOGIES[technology.trim().toLowerCase()];
}

function isExternalLinkAvailable(url: string): boolean {
  return Boolean(url && url !== '#');
}

export function ProjectInfoPanel({
  project,
  position,
  onClose,
}: ProjectInfoPanelProps) {

const panelStyle = {
  left: `${position.x}px`,
  top: `${position.y}px`,
  transform: 'translateY(-50%)',
} as CSSProperties;
  return (
    <aside
  className={styles.panel}
  style={panelStyle}
  data-project-panel
  aria-label={`${project.title} project details`}
>
      {onClose && (
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close project information"
        >
          ×
        </button>
      )}

      

      <div className={styles.content}>
        <p className={styles.category}>{project.category}</p>

        <h2 className={styles.title}>{project.title}</h2>

        <p className={styles.description}>
          {project.description}
        </p>

        <div className={styles.technologySection}>
          <ul
            className={styles.technologies}
            aria-label="Technologies used"
          >
            {project.technologies.map((technology) => {
              const technologyInfo = getTechnologyInfo(technology);

              if (!technologyInfo) {
                return null;
              }

              return (
                <li
                  className={styles.technology}
                  key={technology}
                >
                  <a
                    className={styles.technologyLink}
                    href={technologyInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Learn about ${technology}`}
                    title={technology}
                  >
                    <img
                      className={styles.technologyIcon}
                      src={technologyInfo.icon}
                      alt=""
                      loading="lazy"
                      draggable={false}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.actions}>
          {isExternalLinkAvailable(project.sourceUrl) && (
            <a
              className={styles.sourceLink}
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub"
            >
              <img
                src={TECHNOLOGIES.github.icon}
                alt=""
                className={styles.githubIcon}
                draggable={false}
              />

              <span>GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {isExternalLinkAvailable(project.liveUrl) && (
            <a
              className={styles.liveLink}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
