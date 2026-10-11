
import type { CSSProperties } from "react";
import type { Project } from "../../types/project.types";
import type { ProjectPosition } from "./sphere.utils";
import Classes from "./SphereCard.module.css";

interface SphereCardProps {
  project: Project;
  position: ProjectPosition;
  onHover: (project: Project | null) => void;
  onSelect: (project: Project) => void;
}

const SphereCard = ({
  project,
  position,
  onHover,
  onSelect,
}: SphereCardProps) => {
  const cardStyle = {
    "--x": `${position.x}px`,
    "--y": `${position.y}px`,
    "--scale": position.scale,
    "--opacity": position.opacity,
    zIndex: Math.round(position.z + 1000),
  } as CSSProperties;

  const handleClick = () => {
    if (window.matchMedia("(hover: none)").matches) {
      onHover(project);
      return;
    }

    onSelect(project);
  };

  return (
    <button
      type="button"
      data-project-id={project.id}
      className={Classes.card}
      style={cardStyle}
      onMouseEnter={() => onHover(project)}
      onFocus={() => onHover(project)}
      onClick={handleClick}
      aria-label={`مشاهده پروژه ${project.title}`}
    >
      <img
        className={Classes.image}
        src={project.image}
        alt={project.title}
        draggable={false}
      />

      <div className={Classes.cardInfo}>
        <span className={Classes.category}>
          {project.category}
        </span>

        <h3 className={Classes.title}>
          {project.title}
        </h3>

        <span className={Classes.year}>
          {project.year}
        </span>
      </div>
    </button>
  );
};

export default SphereCard;
