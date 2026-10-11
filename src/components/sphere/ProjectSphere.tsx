
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { Project } from "../../types/project.types";
import {
  getSpherePoints,
  rotateSpherePoint,
} from "./sphere.utils";
import Classes from "./ProjectSphere.module.css";
import SphereCard from "./SphereCard";
import { ProjectInfoPanel } from "./projectInfoPanel";

interface ProjectSphereProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

interface PanelPosition {
  x: number;
  y: number;
}

const DESKTOP_RADIUS = 245;
const TABLET_RADIUS = 180;
const MOBILE_RADIUS = 140;
const DRAG_SENSITIVITY = 0.008;
const PANEL_GAP = 12;
const PANEL_EDGE_GAP = 8;

const ProjectSphere = ({
  projects,
  onSelect,
}: ProjectSphereProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  const [radius, setRadius] = useState(DESKTOP_RADIUS);
  const [rotation, setRotation] = useState({
    x: -0.15,
    y: 0,
  });
  const [hoveredProject, setHoveredProject] =
    useState<Project | null>(null);
  const [panelPosition, setPanelPosition] =
    useState<PanelPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    const updateRadius = () => {
      const { width } = scene.getBoundingClientRect();

      let nextRadius = DESKTOP_RADIUS;

      if (width <= 480) {
        nextRadius = MOBILE_RADIUS;
      } else if (width <= 768) {
        nextRadius = TABLET_RADIUS;
      }

      setRadius((currentRadius) =>
        currentRadius === nextRadius
          ? currentRadius
          : nextRadius
      );
    };

    const observer = new ResizeObserver(updateRadius);

    observer.observe(scene);
    updateRadius();

    return () => observer.disconnect();
  }, []);

  const points = useMemo(
    () => getSpherePoints(projects.length, radius),
    [projects.length, radius]
  );

  const positions = useMemo(
    () =>
      points.map((point) =>
        rotateSpherePoint(
          point,
          rotation.x,
          rotation.y,
          radius
        )
      ),
    [points, rotation, radius]
  );

  const hoveredIndex = projects.findIndex(
    (project) => project.id === hoveredProject?.id
  );

  const hoveredPosition =
    hoveredIndex >= 0 ? positions[hoveredIndex] : null;

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene || !hoveredProject) return;

    const activeCard = Array.from(
      scene.querySelectorAll<HTMLElement>(
        "[data-project-id]"
      )
    ).find(
      (card) =>
        card.dataset.projectId === String(hoveredProject.id)
    );

    const panel = scene.querySelector<HTMLElement>(
      "[data-project-panel]"
    );

    if (!activeCard || !panel) return;

    const sceneRect = scene.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();

    const panelWidth = panel.offsetWidth;
    const panelHeight = panel.offsetHeight;

    const cardLeft = cardRect.left - sceneRect.left;
    const cardRight = cardRect.right - sceneRect.left;
    const cardCenterY =
      cardRect.top -
      sceneRect.top +
      cardRect.height / 2;

    const rightSpace = sceneRect.width - cardRight;
    const leftSpace = cardLeft;

    let x: number;

    if (rightSpace >= panelWidth + PANEL_GAP) {
      x = cardRight + PANEL_GAP;
    } else if (leftSpace >= panelWidth + PANEL_GAP) {
      x = cardLeft - panelWidth - PANEL_GAP;
    } else if (rightSpace >= leftSpace) {
      x = cardRight + PANEL_GAP;
    } else {
      x = cardLeft - panelWidth - PANEL_GAP;
    }

    const maxX = Math.max(
      PANEL_EDGE_GAP,
      sceneRect.width - panelWidth - PANEL_EDGE_GAP
    );

    x = Math.max(
      PANEL_EDGE_GAP,
      Math.min(x, maxX)
    );

    const minY = panelHeight / 2 + PANEL_EDGE_GAP;
    const maxY = Math.max(
      minY,
      sceneRect.height - panelHeight / 2 - PANEL_EDGE_GAP
    );

    const y = Math.max(
      minY,
      Math.min(cardCenterY, maxY)
    );

    setPanelPosition({ x, y });
  }, [hoveredProject, positions, radius]);

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const target = event.target as HTMLElement;

    if (target.closest("[data-project-panel]")) return;

    isDraggingRef.current = true;

    pointerRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (!isDraggingRef.current) return;

    const deltaX = event.clientX - pointerRef.current.x;
    const deltaY = event.clientY - pointerRef.current.y;

    pointerRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    setRotation((current) => ({
      x: current.x - deltaY * DRAG_SENSITIVITY,
      y: current.y + deltaX * DRAG_SENSITIVITY,
    }));
  };

  const handlePointerUp = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    isDraggingRef.current = false;

    if (
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  useEffect(() => {
    let frameId = 0;
    let lastUpdate = 0;

    const animate = (time: number) => {
      if (time - lastUpdate >= 33) {
        if (!isDraggingRef.current) {
          setRotation((current) => ({
            ...current,
            y: current.y + 0.0025,
          }));
        }

        lastUpdate = time;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      ref={sceneRef}
      className={Classes.scene}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={(event) => {
        const nextTarget = event.relatedTarget;

        if (
          nextTarget instanceof Node &&
          event.currentTarget.contains(nextTarget)
        ) {
          return;
        }

        setHoveredProject(null);
      }}
    >
      <div className={Classes.ambientSphere} />
      <div className={Classes.sphereCore} />

      <div className={Classes.cardsLayer}>
        {projects.map((project, index) => (
          <SphereCard
            key={project.id}
            project={project}
            position={positions[index]}
            onHover={setHoveredProject}
            onSelect={onSelect}
          />
        ))}
      </div>

      {hoveredProject && hoveredPosition && (
    <ProjectInfoPanel
        project={hoveredProject}
        position={panelPosition}
    />
)}
    </div>
  );
};

export default ProjectSphere;
