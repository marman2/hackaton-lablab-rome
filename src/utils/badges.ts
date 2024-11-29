import { Badge, User } from '../types';

export const BADGES = {
  FIRST_CLEANUP: {
    id: 'first-cleanup',
    name: 'First Cleanup',
    description: 'Completed your first cleanup challenge',
    icon: '🌱'
  },
  RECYCLING_MASTER: {
    id: 'recycling-master',
    name: 'Recycling Master',
    description: 'Completed 5 recycling challenges',
    icon: '♻️'
  },
  COMMUNITY_HERO: {
    id: 'community-hero',
    name: 'Community Hero',
    description: 'Earned 1000 points',
    icon: '🦸'
  }
};

export function checkBadgeEligibility(user: User): Badge[] {
  const newBadges: Badge[] = [];
  const existingBadgeIds = user.badges.map(b => b.id);

  // Check for first cleanup badge
  if (!existingBadgeIds.includes(BADGES.FIRST_CLEANUP.id) && 
      user.completedChallenges.length > 0) {
    newBadges.push({
      ...BADGES.FIRST_CLEANUP,
      unlockedAt: new Date()
    });
  }

  // Check for recycling master badge
  const recyclingChallenges = user.completedChallenges.filter(c => 
    c.includes('recycling')).length;
  if (!existingBadgeIds.includes(BADGES.RECYCLING_MASTER.id) && 
      recyclingChallenges >= 5) {
    newBadges.push({
      ...BADGES.RECYCLING_MASTER,
      unlockedAt: new Date()
    });
  }

  // Check for community hero badge
  if (!existingBadgeIds.includes(BADGES.COMMUNITY_HERO.id) && 
      user.points >= 1000) {
    newBadges.push({
      ...BADGES.COMMUNITY_HERO,
      unlockedAt: new Date()
    });
  }

  return newBadges;
}