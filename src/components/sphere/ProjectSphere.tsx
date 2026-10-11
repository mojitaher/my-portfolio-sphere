import { useCallback, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { Project } from '../../types/project.types';
import { SphereCard } from './SphereCard';
import styles from './ProjectSphere.module.css';

gsap.registerPlugin(useGSAP);

interface ProjectSphereProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

const DESKTOP_RADIUS = 255;
const MOBILE_RADIUS = 185;

export function ProjectSphere({ projects, onSelect }: ProjectSphereProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ x: -8, y: 0 });
  const dragRef = useRef({ active: false, pointerX: 0, pointerY: 0, moved: false });
  const suppressClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const getRadius = useCallback(() => {
    if (typeof window === 'undefined') return DESKTOP_RADIUS;
    return window.matchMedia('(max-width: 640px)').matches ? MOBILE_RADIUS : DESKTOP_RADIUS;
  }, []);

  useGSAP(() => {
    const sphere = sphereRef.current;
    if (!sphere) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.set(sphere, { rotationX: rotationRef.current.x, rotationY: rotationRef.current.y, transformPerspective: 1200 });
    if (motionPreference) return;

    const idleRotation = gsap.to(sphere, {
      rotationY: '+=360',
      duration: 90,
      ease: 'none',
      repeat: -1,
      onUpdate: () => {
        if (!dragRef.current.active) {
          rotationRef.current.y = Number(gsap.getProperty(sphere, 'rotationY'));
        }
      },
    });

    return () => idleRotation.kill();
  }, { scope: sceneRef });

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      active: true,
      pointerX: event.clientX,
      pointerY: event.clientY,
      moved: false,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    gsap.killTweensOf(sphereRef.current);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || !sphereRef.current) return;
    const deltaX = event.clientX - dragRef.current.pointerX;
    const deltaY = event.clientY - dragRef.current.pointerY;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 2) dragRef.current.moved = true;
    dragRef.current.pointerX = event.clientX;
    dragRef.current.pointerY = event.clientY;

    rotationRef.current.y += deltaX * 0.42;
    rotationRef.current.x = Math.max(-35, Math.min(35, rotationRef.current.x - deltaY * 0.28));
    gsap.set(sphereRef.current, {
      rotationY: rotationRef.current.y,
      rotationX: rotationRef.current.x,
    });
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current.active = false;
    setIsDragging(false);
    if (dragRef.current.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 250);
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!sphereRef.current) return;
    // Resume the gentle automatic rotation from the current orientation.
    gsap.to(sphereRef.current, {
      rotationY: rotationRef.current.y + 360,
      duration: 90,
      ease: 'none',
      repeat: -1,
      overwrite: true,
      onUpdate: () => {
        rotationRef.current.y = Number(gsap.getProperty(sphereRef.current, 'rotationY'));
      },
    });
  };

  const handlePointerCancel = () => {
    dragRef.current.active = false;
    setIsDragging(false);
  };

  return (
    <div
      ref={sceneRef}
      className={`${styles.scene} ${isDragging ? styles.dragging : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      role="group"
      aria-label="Interactive 3D project sphere. Drag to rotate."
    >
      <div className={styles.ambient} aria-hidden="true" />
      <div
  className={`${styles.orbit} ${styles.orbitOne}`}
  aria-hidden="true"
/>

<div
  className={`${styles.orbit} ${styles.orbitTwo}`}
  aria-hidden="true"
/>
      <div className={styles.sphere} ref={sphereRef}>
        {projects.map((project, index) => (
          <SphereCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            radius={getRadius()}
            onSelect={(project) => {
              if (suppressClickRef.current) return;
              onSelect(project);
            }}
          />
        ))}
      </div>
      <div className={styles.centerGlow} aria-hidden="true" />
    </div>
  );
}
