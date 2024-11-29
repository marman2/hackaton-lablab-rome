import React from 'react';
import { useStore } from '../../store/useStore';
import { Trophy, Award, MapPin } from 'lucide-react';
import LevelProgress from './LevelProgress';
import BadgesList from './BadgesList';

export default function Profile() {
  const { currentUser, challenges } = useStore();

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <p className="text-gray-500">Please log in to view your profile</p>
      </div>
    );
  }

  const completedChallenges = challenges.filter(
    (challenge) => currentUser.completedChallenges.includes(challenge.id)
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-500 p-6 text-white">
          <div className="flex items-center gap-4">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-20 h-20 rounded-full border-4 border-white"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-400 flex items-center justify-center text-2xl font-bold">
                {currentUser.username.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{currentUser.username}</h2>
              <div className="flex items-center gap-2 mt-2">
                <Trophy className="w-5 h-5" />
                <span>{currentUser.points} points</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <LevelProgress points={currentUser.points} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          Badges
        </h3>
        <BadgesList badges={currentUser.badges} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          Completed Challenges
        </h3>
        
        {completedChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium">{challenge.description}</p>
                  <p className="text-sm text-gray-500">
                    {challenge.points} points • {challenge.type}
                  </p>
                  {challenge.flags && challenge.flags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {challenge.flags.map((flag) => (
                        <span
                          key={flag}
                          className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No completed challenges yet</p>
        )}
      </div>
    </div>
  );
}