const UserManagement = () => {
  const users = [
    {
      _id: "6905a66b74cd9507fd6fe961",
      name: "Ankush",
      email: "admin@abhyasi.com",
      certificates: [],
      completedCourses: [],
      enrolledProfessions: [],
      lastLogin: "2025-11-03T19:56:42.022Z",
      currentCourse: "React Fundamentals",
      currentModule: "Component Fragmentation",
    },
    {
      _id: "6905a66b74cd9507fd6fe962",
      name: "Riya Sharma",
      email: "riya.sharma@example.com",
      certificates: [],
      completedCourses: ["HTML & CSS Basics"],
      enrolledProfessions: ["Frontend Developer"],
      lastLogin: "2025-11-04T09:14:28.533Z",
      currentCourse: "JavaScript Advanced",
      currentModule: "Async Patterns",
    },
    {
      _id: "6905a66b74cd9507fd6fe963",
      name: "Arjun Mehta",
      email: "arjun.mehta@example.com",
      certificates: [],
      completedCourses: ["Python for Beginners"],
      enrolledProfessions: ["Data Analyst"],
      lastLogin: "2025-11-02T16:45:09.201Z",
      currentCourse: "Machine Learning with Scikit-learn",
      currentModule: "Regression Models",
    },
    {
      _id: "6905a66b74cd9507fd6fe964",
      name: "Khushi Patel",
      email: "khushi.patel@example.com",
      certificates: [],
      completedCourses: [],
      enrolledProfessions: [],
      lastLogin: "2025-11-03T21:02:15.472Z",
      currentCourse: "UI/UX Design Essentials",
      currentModule: "Color Psychology",
    },
    {
      _id: "6905a66b74cd9507fd6fe965",
      name: "Devansh Rao",
      email: "devansh.rao@example.com",
      certificates: [],
      completedCourses: ["AWS Cloud Practitioner"],
      enrolledProfessions: ["DevOps Engineer"],
      lastLogin: "2025-11-04T10:30:18.981Z",
      currentCourse: "Docker & Kubernetes Mastery",
      currentModule: "Container Orchestration",
    },
    {
      _id: "6905a66b74cd9507fd6fe966",
      name: "Sneha Kapoor",
      email: "sneha.kapoor@example.com",
      certificates: [],
      completedCourses: [],
      enrolledProfessions: [],
      lastLogin: "2025-11-03T22:12:05.735Z",
      currentCourse: "Full Stack Web Development",
      currentModule: "Express Routing",
    },
    {
      _id: "6905a66b74cd9507fd6fe967",
      name: "Rohan Gupta",
      email: "rohan.gupta@example.com",
      certificates: [],
      completedCourses: ["Network Security Basics"],
      enrolledProfessions: ["Cybersecurity Analyst"],
      lastLogin: "2025-11-04T07:18:24.647Z",
      currentCourse: "Ethical Hacking Fundamentals",
      currentModule: "Exploitation Techniques",
    },
    {
      _id: "6905a66b74cd9507fd6fe968",
      name: "Priya Nair",
      email: "priya.nair@example.com",
      certificates: [],
      completedCourses: [],
      enrolledProfessions: [],
      lastLogin: "2025-11-03T20:47:33.902Z",
      currentCourse: "Data Visualization with Python",
      currentModule: "Matplotlib Essentials",
    },
    {
      _id: "6905a66b74cd9507fd6fe969",
      name: "Aditya Verma",
      email: "aditya.verma@example.com",
      certificates: [],
      completedCourses: ["HTML & CSS Basics", "JavaScript Essentials"],
      enrolledProfessions: ["Frontend Developer"],
      lastLogin: "2025-11-04T11:08:55.313Z",
      currentCourse: "React Advanced",
      currentModule: "Performance Optimization",
    },
    {
      _id: "6905a66b74cd9507fd6fe970",
      name: "Neha Singh",
      email: "neha.singh@example.com",
      certificates: [],
      completedCourses: [],
      enrolledProfessions: [],
      lastLogin: "2025-11-03T23:56:40.128Z",
      currentCourse: "Cloud Fundamentals",
      currentModule: "IAM & Security Groups",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          User Management
        </h2>
        <p className="text-sm text-gray-500">Total Users: {users.length}</p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  History
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* User Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Current Course */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.currentCourse || "—"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.currentModule || "—"}
                    </div>
                  </td>

                  {/* History */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div>
                      <strong>Professions:</strong>{" "}
                      {user.enrolledProfessions.length > 0
                        ? user.enrolledProfessions.join(", ")
                        : "None"}
                    </div>
                    <div>
                      <strong>Courses:</strong>{" "}
                      {user.completedCourses.length > 0
                        ? user.completedCourses.join(", ")
                        : "None"}
                    </div>
                  </td>

                  {/* Last Login */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
