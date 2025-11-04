import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { setInitialCourse } from "../../redux/slices/coursesSlice";
import { useDispatch } from "react-redux";

const CreateCourse = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const difficultyRef = useRef();
  const durationRef = useRef();
  const thumbnailUrlRef = useRef();
  const statusRef = useRef();
  const isPublishedRef = useRef();
  const dispatch = useDispatch();

  const initialCourse = useSelector((state) => state.courses.initialCourse);

  const handleSubmitCourse = async (e) => {
    e.preventDefault();

    const courseData = {
      title: titleRef.current.value.trim(),
      description: descriptionRef.current.value.trim(),
      difficulty: difficultyRef.current.value,
      duration: durationRef.current.value.trim(),
      thumbnailUrl: thumbnailUrlRef.current.files[0],
      status: statusRef.current.value,
      isPublished: isPublishedRef.current.checked,
    };

    console.log("Submitted Course:", courseData);
    if (!initialCourse) {
      // for new course creation
      dispatch(setInitialCourse({ ...courseData, _id: Date.now() }));
      console.log("Creating new course:", courseData);
    } else {
      // for updating existing course
      // pass new updated course to initialCourse in redux store
      dispatch(setInitialCourse({ ...courseData, _id: initialCourse._id }));
      console.log("Updating course:", { id: initialCourse.id, ...courseData });
    }
  };

  useEffect(() => {
    if (initialCourse) {
      setIsCollapsed(true);
      titleRef.current.value = initialCourse.title || "";
      descriptionRef.current.value = initialCourse.description || "";
      difficultyRef.current.value = initialCourse.difficulty || "easy";
      durationRef.current.value = initialCourse.duration || "";
      statusRef.current.value = initialCourse.status || "draft";
      if (isPublishedRef.current)
        isPublishedRef.current.checked = !!initialCourse.isPublished;
    }
  }, [initialCourse]);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 border border-gray-100">
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-8 ${
          initialCourse ? "cursor-pointer select-none" : ""
        }`}
        onClick={() => initialCourse && setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          {initialCourse && (
            <span className="text-gray-500">
              {isCollapsed ? (
                <FaChevronDown size={20} />
              ) : (
                <FaChevronUp size={20} />
              )}
            </span>
          )}
          <h2 className="text-2xl font-semibold text-gray-800">
            {initialCourse?.title ? initialCourse.title : "Create New Course"}
          </h2>
        </div>
        {initialCourse?.thumbnailUrl && (
          <img
            src={initialCourse.thumbnailUrl}
            alt="Course thumbnail"
            className="w-14 h-14 object-cover rounded-lg"
          />
        )}
      </div>

      <form
        onSubmit={handleSubmitCourse}
        className={`space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 ${
          isCollapsed && initialCourse ? "hidden" : ""
        }`}
      >
        {/* Course Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Title */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Course Title
            </label>
            <input
              required
              ref={titleRef}
              type="text"
              placeholder="Enter course title"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 outline-none transition-all"
            />
          </div>

          {/* Duration */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Duration
            </label>
            <input
              required
              ref={durationRef}
              type="text"
              placeholder="e.g. 6 weeks"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 outline-none transition-all"
            />
          </div>

          {/* Difficulty */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              ref={difficultyRef}
              defaultValue={"easy"}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 outline-none transition-all bg-white"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Status */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              ref={statusRef}
              defaultValue="draft"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 outline-none transition-all bg-white"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* isPublished */}
          <div className="col-span-1 flex items-center gap-2 mt-6">
            <input
              ref={isPublishedRef}
              type="checkbox"
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label className="text-sm font-semibold text-gray-700">
              Is Published
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            required
            ref={descriptionRef}
            rows="5"
            placeholder="Write a short description about the course..."
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 outline-none transition-all resize-none"
          />
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Thumbnail
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
              required
              ref={thumbnailUrlRef}
              type="file"
              accept="image/*"
              className="block w-full sm:w-auto text-sm text-gray-600 border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
          >
            {initialCourse ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
