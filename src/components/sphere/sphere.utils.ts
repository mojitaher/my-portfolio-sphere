
export interface SpherePoint {
  x: number;
  y: number;
  z: number;
}

export interface ProjectPosition {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
}

export const getSpherePoints = (count: number, radius: number): SpherePoint[] => {
  const points: SpherePoint[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / Math.max(count - 1, 1)) * 2;
    const horizontalRadius = Math.sqrt(1 - y * y);
    const angle = goldenAngle * index;

    points.push({
      x: Math.cos(angle) * horizontalRadius * radius,
      y: y * radius,
      z: Math.sin(angle) * horizontalRadius * radius,
    });
  }

  return points;
};

export const rotateSpherePoint = (
  point: SpherePoint,
  rotationX: number,
  rotationY: number,
  radius: number,
): ProjectPosition => {
  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);

  const rotatedX = point.x * cosY + point.z * sinY;
  const rotatedZ = -point.x * sinY + point.z * cosY;

  const rotatedY = point.y * cosX - rotatedZ * sinX;
  const finalZ = point.y * sinX + rotatedZ * cosX;

  const depth = (finalZ + radius) / (radius * 2);

  return {
    x: rotatedX,
    y: rotatedY,
    z: finalZ,
    scale: 0.76 + depth * 0.26,
    opacity: 0.65 + depth * 0.35,
  };
};
