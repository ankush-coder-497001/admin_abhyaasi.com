import Loader from "../components/ui/Loader";
import { useGetAllUsers } from "../hooks/useUsers";

const UserManagement = () => {
  const { data, isLoading, error } = useGetAllUsers();
  const users = data?.users || [];
  console.log(users);
  if (isLoading) {
    return (
      <div className="h-[70vh] w-full">
        <Loader />
      </div>
    );
  }

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
                      {typeof user.currentCourse === "object"
                        ? user.currentCourse?.title || "—"
                        : user.currentCourse || "—"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {typeof user.currentModule === "object"
                        ? user.currentModule?.title || "—"
                        : user.currentModule || "—"}
                    </div>
                  </td>

                  {/* History */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div>
                      <strong>Professions:</strong>{" "}
                      {user.enrolledProfessions &&
                      user.enrolledProfessions.length > 0
                        ? user.enrolledProfessions
                            .map((prof) =>
                              typeof prof === "object" ? prof.title : prof
                            )
                            .join(", ")
                        : "None"}
                    </div>
                    <div>
                      <strong>Courses:</strong>{" "}
                      {user.completedCourses && user.completedCourses.length > 0
                        ? user.completedCourses
                            .map((course) =>
                              typeof course === "object" ? course.title : course
                            )
                            .join(", ")
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
