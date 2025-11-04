import { useState } from "react";
import { FaPlus, FaList } from "react-icons/fa";
import AllCourses from "../components/courses/AllCourses";
import ActionOnCourse from "../components/courses/ActionOnCourse";
import { setInitialCourse } from "../redux/slices/coursesSlice";
import { useDispatch } from "react-redux";

const CoursesManagement = () => {
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState("all-courses");

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          Courses Management
        </h2>
      </div>

      {/* Toggle Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => {
            setActiveView("all-courses");
          }}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer ${
            activeView === "all-courses"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <FaList className="w-4 h-4" />
          <span>All Courses</span>
        </button>
        {activeView === "all-courses" && (
          <button
            onClick={() => {
              setActiveView("create-course");
              dispatch(setInitialCourse(null));
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer ${
              activeView === "create-course"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FaPlus className="w-4 h-4" />
            <span>Create Course</span>
          </button>
        )}
      </div>

      {activeView === "all-courses" && (
        <AllCourses setActiveView={setActiveView} />
      )}
      {activeView === "create-course" && (
        <ActionOnCourse setActiveView={setActiveView} />
      )}
    </div>
  );
};

export default CoursesManagement;
