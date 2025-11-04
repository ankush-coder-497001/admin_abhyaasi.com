import { useState } from "react";

const Leaderboard = () => {
  const [leaderboardData] = useState([
    {
      id: "507f1f77bcf86cd799439011",
      name: "Priya Sharma",
      points: 2500,
      rank: "Gold",
      profile: {
        bio: "Full-stack developer passionate about AI",
        college: "IIT Delhi",
        year: 3,
        profilePic: null,
      },
      badges: [
        {
          id: "507f1f77bcf86cd799439021",
          title: "AI Master",
          description: "Completed advanced AI course with distinction",
          iconUrl: "https://example.com/badges/ai-master.png",
        },
        {
          id: "507f1f77bcf86cd799439022",
          title: "Problem Solver",
          description: "Solved 100+ coding challenges",
          iconUrl: "https://example.com/badges/problem-solver.png",
        },
      ],
      currentCourse: "Advanced Machine Learning",
      completedCourses: 8,
    },
    {
      id: "507f1f77bcf86cd799439012",
      name: "Rahul Kumar",
      points: 2100,
      rank: "Gold",
      profile: {
        bio: "Data Science enthusiast",
        college: "BITS Pilani",
        year: 4,
        profilePic: null,
      },
      badges: [
        {
          id: "507f1f77bcf86cd799439023",
          title: "Data Wizard",
          description: "Excellence in data analysis",
          iconUrl: "https://example.com/badges/data-wizard.png",
        },
      ],
      currentCourse: "Data Science Fundamentals",
      completedCourses: 6,
    },
    {
      id: "507f1f77bcf86cd799439013",
      name: "Aisha Patel",
      points: 1800,
      rank: "Silver",
      profile: {
        bio: "Web developer and UX designer",
        college: "NIT Surathkal",
        year: 2,
        profilePic: null,
      },
      badges: [
        {
          id: "507f1f77bcf86cd799439024",
          title: "UI Expert",
          description: "Created exceptional user interfaces",
          iconUrl: "https://example.com/badges/ui-expert.png",
        },
      ],
      currentCourse: "Advanced React Development",
      completedCourses: 5,
    },
    {
      id: "507f1f77bcf86cd799439014",
      name: "Arjun Singh",
      points: 1600,
      rank: "Silver",
      profile: {
        bio: "Backend developer",
        college: "VIT Vellore",
        year: 3,
        profilePic: null,
      },
      badges: [
        {
          id: "507f1f77bcf86cd799439025",
          title: "Backend Pro",
          description: "Excellence in backend development",
          iconUrl: "https://example.com/badges/ui-expert.png",
        },
      ],
      currentCourse: "System Design",
      completedCourses: 4,
    },
    {
      id: "507f1f77bcf86cd799439015",
      name: "Neha Gupta",
      points: 1400,
      rank: "Bronze",
      profile: {
        bio: "Mobile app developer",
        college: "DTU Delhi",
        year: 2,
        profilePic: null,
      },
      badges: [
        {
          id: "507f1f77bcf86cd799439026",
          title: "Mobile Master",
          description: "Created multiple mobile applications",
          iconUrl: "https://example.com/badges/mobile-master.png",
        },
      ],
      currentCourse: "iOS Development",
      completedCourses: 3,
    },
    {
      id: "507f1f77bcf86cd799439016",
      name: "Vikram Reddy",
      points: 1200,
      rank: "Bronze",
      profile: {
        bio: "Cloud computing enthusiast",
        college: "IIIT Hyderabad",
        year: 4,
        profilePic: null,
      },
      badges: [
        {
          id: "507f1f77bcf86cd799439027",
          title: "Cloud Champion",
          description: "Mastered cloud technologies",
          iconUrl: "https://example.com/badges/cloud-champion.png",
        },
      ],
      currentCourse: "AWS Solutions Architect",
      completedCourses: 3,
    },
  ]);

  const getRankColor = (rank) => {
    switch (rank.toLowerCase()) {
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

      {/* Top 3 performers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaderboardData.slice(0, 3).map((user, index) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
          >
            <div className="relative">
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-r ${getRankColor(
                  user.rank
                )} flex items-center justify-center text-white text-2xl font-bold mb-4`}
              >
                {user.profile.profilePic ? (
                  <img
                    src={user.profile.profilePic}
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
              {user.points} pts
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {user.badges.map((badge) => (
                <span
                  key={badge.id}
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
            {leaderboardData.slice(3).map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{index + 4}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-r ${getRankColor(
                        user.rank
                      )} flex items-center justify-center text-white font-bold`}
                    >
                      {user.profile.profilePic ? (
                        <img
                          src={user.profile.profilePic}
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
                      <div className="text-sm text-gray-500">{user.rank}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.points} pts
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {user.badges.map((badge) => (
                      <span
                        key={badge.id}
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
    </div>
  );
};

export default Leaderboard;
