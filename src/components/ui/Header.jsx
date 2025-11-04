import { FaBars } from "react-icons/fa";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          <FaBars className="w-5 h-5" />
        </button>

        <h1 className="text-xl font-semibold text-gray-800 flex-1 lg:flex-none w-full text-center">
          Admin Dashboard
        </h1>

        {/* <div className="flex items-center space-x-4"></div> */}
      </div>
    </header>
  );
};

export default Header;
