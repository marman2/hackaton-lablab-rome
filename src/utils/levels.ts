export function calculateLevel(points: number): number {
  // Each level requires 20% more points than the previous levels
  const basePoints = 100;
  let level = 1;
  let requiredPoints = basePoints;

  while (points >= requiredPoints) {
    level++;
    requiredPoints += Math.floor(basePoints * Math.pow(1.2, level - 1));
  }

  return level;
}

export function getNextLevelPoints(points: number): number {
  const basePoints = 100;
  let level = calculateLevel(points);
  let requiredPoints = basePoints;

  for (let i = 1; i < level; i++) {
    requiredPoints += Math.floor(basePoints * Math.pow(1.2, i));
  }

  return requiredPoints;
}