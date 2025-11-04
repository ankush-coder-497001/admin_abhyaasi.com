import { NavLink } from "react-router-dom";
import { FaUsers, FaBook, FaBriefcase, FaTrophy, FaGraduationCap, FaUser } from "react-icons/fa";

const Sidebar = ({ setSidebarOpen }) => {
  const menuItems = [
    { id: "users", label: "User Management", path: "/users", icon: <FaUsers className="w-5 h-5" /> },
    { id: "courses", label: "Courses Management", path: "/courses", icon: <FaBook className="w-5 h-5" /> },
    { id: "professions", label: "Profession Management", path: "/professions", icon: <FaBriefcase className="w-5 h-5" /> },
    { id: "leaderboard", label: "Leaderboard", path: "/leaderboard", icon: <FaTrophy className="w-5 h-5" /> },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200 flex items-center space-x-3">
        <FaGraduationCap className="w-8 h-8 text-blue-600" />
        <h1 className="text-xl font-bold text-gray-800">Abhyaasi</h1>
      </div>

      {/* Main Menu */}
      <nav className="mt-6 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={handleLinkClick}
            className={({ isActive }) => `
              flex items-center space-x-3 w-full px-6 py-3 text-sm font-medium transition-colors duration-200
              ${isActive
                ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
            `}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Profile Tab at Bottom */}
      <div className="mt-auto border-t border-gray-200">
        <NavLink
          to="/profile"
          onClick={handleLinkClick}
          className={({ isActive }) => `
            flex items-center space-x-3 w-full px-6 py-3 text-sm font-medium transition-colors duration-200
            ${isActive
              ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
          `}
        >
          <FaUser className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
