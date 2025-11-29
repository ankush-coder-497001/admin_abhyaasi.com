import { useState } from "react";
import { FaClock, FaLayerGroup, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import CourseView from "./CourseView";
import { setInitialCourse } from "../../redux/slices/coursesSlice";
import { useDispatch } from "react-redux";
import { useDeleteCourse, useGetAllCourses } from "../../hooks/useCourse";
import Loader from "../ui/Loader";
import ConfirmationModal from "../ui/ConfirmationModal";
import toast from "react-hot-toast";

const AllCourses = ({ setActiveView }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const dispatch = useDispatch();

  const { data: courses = [], isLoading, error } = useGetAllCourses();
  const { mutate: deleteCourse, isLoading: isDeleting } = useDeleteCourse();

  const handleView = (course) => setSelectedCourse(course);
  const handleCloseView = () => setSelectedCourse(null);

  const filteredCourses = courses?.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (course) => {
    setActiveView("create-course");
    dispatch(setInitialCourse(course));
  };

  const handleDelete = (courseId) => {
    setCourseToDelete(courseId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete, {
        onSuccess: () => {
          toast.success("Course deleted successfully");
          setShowConfirmation(false);
          setCourseToDelete(null);
        },
        onError: () => {
          toast.error("Failed to delete course");
          setShowConfirmation(false);
          setCourseToDelete(null);
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setCourseToDelete(null);
  };

  if (isLoading || isDeleting) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p>Course not found</p>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <ConfirmationModal
        isOpen={showConfirmation}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      {selectedCourse ? (
        <CourseView course={selectedCourse} onClose={handleCloseView} />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search courses....."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  statusFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("draft")}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  statusFilter === "draft"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => setStatusFilter("published")}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  statusFilter === "published"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setStatusFilter("archived")}
                className={`px-4 py-2 rounded-lg ${
                  statusFilter === "archived"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Archived
              </button>
            </div>
          </div>
          {filteredCourses.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No courses found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all duration-200 flex flex-col "
                >
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="rounded-lg mb-4 h-40 w-full object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center text-gray-500 text-sm mb-3 gap-4">
                    <span className="flex items-center gap-2 text-blue-600">
                      Status - {course.status}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaLayerGroup className="w-4 h-4" />{" "}
                      {course.modules.length}
                      modules
                    </span>
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <button
                      onClick={() => handleEdit(course)}
                      className="flex items-center gap-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="flex items-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => handleView(course)}
                      className="flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
