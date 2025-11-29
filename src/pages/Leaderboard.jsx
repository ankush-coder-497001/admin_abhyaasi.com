import { useState } from "react";
import { useLeaderboard } from "../hooks/useLeaderboard";

const Leaderboard = () => {
  const { data, isLoading, error } = useLeaderboard();
  const leaderboardData = data?.leaderboard || [];

  const getRankColor = (rankBadge) => {
    // rankBadge is the user's rank badge (Gold/Silver/Bronze), not the numeric position
    if (!rankBadge || typeof rankBadge !== "string") {
      return "from-blue-400 to-blue-600";
    }
    switch (rankBadge.toLowerCase()) {
      case "gold":
        return "from-yellow-400 to-yellow-600";
      case "silver":
        return "from-gray-300 to-gray-500";
      case "bronze":
        return "from-amber-600 to-amber-800";
      default:
        return "from-blue-400 to-blue-600";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-96">
          <div className="text-lg text-gray-600">Loading leaderboard...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error loading leaderboard: {error.message}
        </div>
      )}

      {!isLoading && !error && leaderboardData.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No leaderboard data available
        </div>
      )}

      {!isLoading && !error && leaderboardData.length > 0 && (
        <>
          {/* Top 3 performers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {leaderboardData.slice(0, 3).map((user, index) => (
              <div
                key={user.userId}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
              >
                <div className="relative">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-r ${getRankColor(
                      user.rank
                    )} flex items-center justify-center text-white text-2xl font-bold mb-4`}
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-800">
                      #{index + 1}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {user.name}
                </h3>
                <div className="text-sm text-gray-500 mb-2">{user.rank}</div>
                <div className="text-lg font-bold text-blue-600 mb-3">
                  {user.totalPoints} pts
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {user.badges &&
                    user.badges.map((badge) => (
                      <span
                        key={badge.title}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center gap-1"
                      >
                        {badge.iconUrl && (
                          <img
                            src={badge.iconUrl}
                            alt={badge.title}
                            className="w-4 h-4 rounded-full"
                          />
                        )}
                        {badge.title}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Rest of the leaderboard */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Badges
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.slice(3).map((user) => (
                  <tr key={user.userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{user.rankPosition}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-r ${getRankColor(
                            user.rank
                          )} flex items-center justify-center text-white font-bold`}
                        >
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            user.name.charAt(0)
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.rank}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.totalPoints} pts
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {user.badges &&
                          user.badges.map((badge) => (
                            <span
                              key={badge.title}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center gap-1"
                            >
                              {badge.iconUrl && (
                                <img
                                  src={badge.iconUrl}
                                  alt={badge.title}
                                  className="w-3 h-3 rounded-full"
                                />
                              )}
                              {badge.title}
                            </span>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
