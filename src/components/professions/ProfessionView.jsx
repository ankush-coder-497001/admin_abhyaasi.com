import { IoClose } from "react-icons/io5";
import { useGetAllCourses } from "../../hooks/useCourse";
import CouurseView from "../courses/CourseView";
import { useState } from "react";

const ProfessionView = ({ profession, onClose }) => {
  const { data: coursesData } = useGetAllCourses();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (courseId) => {
    if (!coursesData?.length) return;
    const courseObj = coursesData.find((c) => c._id === courseId);
    if (courseObj) setSelectedCourse(courseObj);
  };

  const mappedCourses = (profession.courses || []).map((c) => {
    if (!coursesData?.length) return { id: c.course, title: c.course };
    const matched = coursesData.find(
      (course) => course._id === (c.course?._id || c.course)
    );
    return { id: c.course, title: matched?.title || c.course };
  });

  return (
    <>
      {selectedCourse?._id ? (
        <CouurseView
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      ) : (
        <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-xl border border-gray-200 transition-transform hover:scale-[1.01]">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{profession.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 text-3xl transition-colors cursor-pointer"
            >
              <IoClose />
            </button>
          </div>

          {/* Thumbnail */}
          {profession.thumbnail && (
            <img
              src={profession.thumbnail}
              alt={profession.name}
              className="w-full h-56 sm:h-64 object-cover rounded-xl mb-6 shadow-md"
            />
          )}

          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 text-lg">Description</h3>
              <p className="text-gray-600 leading-relaxed">{profession.description}</p>
            </div>

            {/* Duration */}
            {profession.estimatedDuration && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">Duration</h3>
                <p className="text-gray-600">{profession.estimatedDuration}</p>
              </div>
            )}

            {/* Courses */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 text-lg">Courses</h3>
              {mappedCourses.length > 0 ? (
                <div className="flex flex-col space-y-2">
                  {mappedCourses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => handleCourseClick(course.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-left cursor-pointer"
                    >
                      • {course.title}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No courses assigned</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 text-lg">Tags</h3>
              {profession.tags?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profession.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No tags</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfessionView;
