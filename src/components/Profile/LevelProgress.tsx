import React from 'react';
import { calculateLevel, getNextLevelPoints } from '../../utils/levels';

interface LevelProgressProps {
  points: number;
}

export default function LevelProgress({ points }: LevelProgressProps) {
  const currentLevel = calculateLevel(points);
  const nextLevelPoints = getNextLevelPoints(points);
  const progress = (points / nextLevelPoints) * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">Level {currentLevel}</span>
        <span className="text-sm text-gray-500">{points} / {nextLevelPoints} points</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}