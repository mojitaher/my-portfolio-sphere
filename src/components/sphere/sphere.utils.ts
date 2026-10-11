export interface SpherePosition {
  x: number;
  y: number;
  z: number;
  rotateY: number;
  rotateX: number;
}

/** Evenly distributes points over a sphere using the Fibonacci-sphere method. */
export function getSpherePosition(index: number, total: number, radius: number): SpherePosition {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / Math.max(total - 1, 1)) * 2;
  const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = goldenAngle * index;
  const x = Math.cos(theta) * ringRadius;
  const z = Math.sin(theta) * ringRadius;

  return {
    x: x * radius,
    y: y * radius,
    z: z * radius,
    rotateY: (Math.atan2(x, z) * 180) / Math.PI,
    rotateX: (-Math.asin(y) * 180) / Math.PI,
  };
}
