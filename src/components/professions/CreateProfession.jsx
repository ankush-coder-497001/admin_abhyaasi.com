import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { setInitialProfession } from "../../redux/slices/professionsSlice";

const availableCourses = [
  "Introduction to HTML & CSS",
  "React Fundamentals",
  "Node.js & Express API Development",
  "Python for Data Analysis",
  "Machine Learning with Scikit-learn",
  "Figma for Beginners",
  "Network Security Essentials",
  "Ethical Hacking Fundamentals",
  "AWS Cloud Practitioner",
  "Docker & Kubernetes Mastery",
  "CI/CD with Jenkins",
];

const CreateProfession = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const nameRef = useRef();
  const descriptionRef = useRef();
  const thumbnailRef = useRef();
  const durationRef = useRef();

  const initialProfession = useSelector(
    (state) => state.profession.initialProfession
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialProfession) {
      nameRef.current.value = initialProfession.name || "";
      descriptionRef.current.value = initialProfession.description || "";
      durationRef.current.value = initialProfession.estimatedDuration || "";
      setSelectedCourses(initialProfession.courses || []);
      setTags(initialProfession.tags || []);
    }
    return () => {
      dispatch(setInitialProfession(null));
    };
  }, [initialProfession]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      estimatedDuration: durationRef.current.value,
      thumbnail: thumbnailRef.current.files[0],
      courses: selectedCourses,
      tags,
    };

    console.log("Form Data:", formData);
  };

  const handleAddCourse = (course) => {
    if (!selectedCourses.find((c) => c.course === course)) {
      setSelectedCourses([
        ...selectedCourses,
        { course, order: selectedCourses.length + 1 },
      ]);
    }
    setSearchQuery("");
  };

  const handleRemoveCourse = (courseToRemove) => {
    setSelectedCourses(
      selectedCourses.filter((c) => c.course !== courseToRemove)
    );
  };

  const handleAddTag = (e) => {
    if (
      e.key === "Enter" &&
      tagInput.trim() &&
      !tags.includes(tagInput.trim())
    ) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const filteredCourses = availableCourses.filter(
    (course) =>
      course.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedCourses.find((c) => c.course === course)
  );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 border border-gray-100">
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-8 ${
          initialProfession ? "cursor-pointer select-none" : ""
        }`}
        onClick={() => initialProfession && setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          {initialProfession && (
            <span className="text-gray-500">
              {isCollapsed ? (
                <FaChevronDown size={20} />
              ) : (
                <FaChevronUp size={20} />
              )}
            </span>
          )}
          <h2 className="text-2xl font-semibold text-gray-800">
            {initialProfession?.name
              ? initialProfession.name
              : "Create New Profession"}
          </h2>
        </div>
        {initialProfession?.thumbnail && (
          <img
            src={initialProfession.thumbnail}
            alt="Profession thumbnail"
            className="w-14 h-14 object-cover rounded-lg"
          />
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className={`space-y-6 transition-all duration-300 ${
          isCollapsed && initialProfession ? "hidden" : ""
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              required
              ref={nameRef}
              type="text"
              placeholder="Enter profession name"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estimated Duration
            </label>
            <input
              required
              ref={durationRef}
              type="text"
              placeholder="e.g. 6 months"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            required
            ref={descriptionRef}
            rows="4"
            placeholder="Write a description about the profession..."
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 outline-none transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Thumbnail
          </label>
          <input
            required
            ref={thumbnailRef}
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Courses
          </label>
          <div className="space-y-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search and add courses..."
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 outline-none transition-all"
            />

            {searchQuery && filteredCourses.length > 0 && (
              <div className="border rounded-lg shadow-sm max-h-40 overflow-y-auto">
                {filteredCourses.map((course, index) => (
                  <div
                    key={index}
                    onClick={() => handleAddCourse(course)}
                    className="p-2 hover:bg-gray-50 cursor-pointer"
                  >
                    {course}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {selectedCourses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {course.course}
                  <button
                    type="button"
                    onClick={() => handleRemoveCourse(course.course)}
                    className="hover:text-blue-800 cursor-pointer"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tags
          </label>
          <div className="space-y-4">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tags (press Enter to add)..."
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 outline-none transition-all"
            />

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-gray-800 cursor-pointer "
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
          >
            {initialProfession ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfession;
