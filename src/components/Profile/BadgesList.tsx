import React from 'react';
import { Badge } from '../../types';

interface BadgesListProps {
  badges: Badge[];
}

export default function BadgesList({ badges }: BadgesListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{badge.icon}</span>
            <div>
              <h4 className="font-semibold">{badge.name}</h4>
              <p className="text-sm text-gray-500">{badge.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                Unlocked: {new Date(badge.unlockedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}