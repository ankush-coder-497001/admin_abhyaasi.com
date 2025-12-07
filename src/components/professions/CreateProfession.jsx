import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { setInitialProfession } from "../../redux/slices/professionsSlice";
import {
  useCreateProfession,
  useUpdateProfession,
  useAssignCourses,
} from "../../hooks/useProfessions";
import { useUploadImg } from "../../hooks/useUpload";
import { useGetAllCourses } from "../../hooks/useCourse";
import Loader from "../ui/Loader";
import toast from "react-hot-toast";

const CreateProfession = ({ setActiveView }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const nameRef = useRef();
  const descriptionRef = useRef();
  const thumbnailRef = useRef();
  const durationRef = useRef();


  const { mutate: createProfession, isPending: isCreatingProfession } =
    useCreateProfession();
  const { mutate: updateProfession, isPending: isUpdatingProfession } =
    useUpdateProfession();
  const { mutate: assignCourses, isPending: isAssigningCourses } =
    useAssignCourses();
  const { mutate: uploadImg, isPending: isUploadingImg } = useUploadImg();
  const { data: coursesData } = useGetAllCourses();

  const availableCourses = coursesData || [];
  const isLoading =
    isCreatingProfession ||
    isUpdatingProfession ||
    isUploadingImg ||
    isAssigningCourses;

  const initialProfession = useSelector(
    (state) => state.profession.initialProfession
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialProfession && availableCourses?.length) {
      setIsCollapsed(true);
      nameRef.current.value = initialProfession.name || "";
      descriptionRef.current.value = initialProfession.description || "";
      durationRef.current.value = initialProfession.estimatedDuration || "";
      setSelectedCourses(
        (initialProfession.courses || []).map((c) => {
          const matched = availableCourses.find(
            (x) => x._id === (c.course?._id || c.course)
          );
          return {
            course: matched || c.course, // attach full course object
            order: c.order,
          };
        })
      );
      setTags(initialProfession.tags || []);
      setTagInput("");
      setThumbnailPreview(initialProfession.thumbnail || null);
    }
  }, [initialProfession, availableCourses]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!initialProfession && !thumbnailRef.current.files.length) {
      toast.error("Please upload a thumbnail image for the profession.");
      return;
    }

    const professionData = {
      name: nameRef.current.value.trim(),
      description: descriptionRef.current.value.trim(),
      estimatedDuration: durationRef.current.value.trim(),
      tags,
      courses: selectedCourses.map((c) => ({
        courseId: c.course?._id || c.course,
        order: c.order,
      })),
    };

    let thumbnailUrl =
      thumbnailRef.current.value || initialProfession?.thumbnail || "";

    // Upload image if a new one is selected
    if (thumbnailRef.current.files.length > 0) {
      return uploadImg(
        { image: thumbnailRef.current.files[0] },
        {
          onSuccess: (data) => {
            thumbnailUrl = data.url;
            submitProfessionData(professionData, thumbnailUrl);
          },
          onError: (error) => {
            toast.error("Failed: Image upload failed");
            console.error(error);
          },
        }
      );
    }

    // If no image to upload, submit directly
    submitProfessionData(professionData, thumbnailUrl);
  };

  const submitProfessionData = (professionData, thumbnailUrl) => {
    const finalData = {
      ...professionData,
      thumbnail: thumbnailUrl,
    };

    // Separate courses from the main data
    const { courses, ...professionDataWithoutCourses } = finalData;
    const courseIdsWithOrder = courses.map((c) => ({
      courseId: c.courseId,
      order: c.order,
    }));

    if (initialProfession) {
      updateProfession(
        {
          professionId: initialProfession._id,
          professionData: professionDataWithoutCourses,
        },
        {
          onSuccess: (data) => {
            const professionId = data?.profession?._id || initialProfession._id;

            // Assign courses after updating profession
            if (courseIdsWithOrder.length > 0) {
              assignCourses(
                { professionId, courseIdsWithOrder },
                {
                  onSuccess: (data) => {
                    toast.success("Profession updated successfully!");
                    dispatch(setInitialProfession(data?.profession || data));
                  },
                  onError: (error) => {
                    toast.error("Failed to assign courses");
                    console.error(error);
                  },
                }
              );
            } else {
              toast.success("Profession updated successfully!");
              dispatch(setInitialProfession(data?.profession || data));
            }
            setActiveView("all-professions");
          },
          onError: (error) => {
            toast.error("Failed to update profession");
            console.error(error);
          },
        }
      );
    } else {
      createProfession(professionDataWithoutCourses, {
        onSuccess: (data) => {
          const professionId = data?.profession?._id;

          if (!professionId) {
            toast.error("Failed to get profession ID. Please try again.");
            console.error("Profession ID is undefined:", data);
            return;
          }

          // Assign courses after creating profession
          if (courseIdsWithOrder.length > 0) {
            assignCourses(
              { professionId, courseIdsWithOrder },
              {
                onSuccess: () => {
                  toast.success("Profession created successfully!");
                  dispatch(setInitialProfession(null));
                  setActiveView("all-professions");
                },
                onError: (error) => {
                  toast.error("Failed to assign courses");
                  console.error(error);
                },
              }
            );
          } else {
            toast.success("Profession created successfully!");
            dispatch(setInitialProfession(null));
            setActiveView("all-professions");
          }
        },
        onError: (error) => {
          toast.error("Failed to create profession");
          console.error(error);
        },
      });
    }
  };

  const handleAddCourse = (course) => {
    if (
      !selectedCourses.find(
        (c) => (c.course?._id || c.course) === (course._id || course)
      )
    ) {
      setSelectedCourses([
        ...selectedCourses,
        { course, order: selectedCourses.length + 1 },
      ]);
    }
    setSearchQuery("");
  };

  const handleRemoveCourse = (courseToRemove) => {
    const filtered = selectedCourses.filter(
      (c) =>
        (c.course?._id || c.course) !== (courseToRemove._id || courseToRemove)
    );
    // Reorder remaining courses
    const reordered = filtered.map((c, index) => ({
      ...c,
      order: index + 1,
    }));
    setSelectedCourses(reordered);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput.trim() && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const handleCourseSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleReorderCourseUp = (index) => {
    if (index > 0) {
      const newCourses = [...selectedCourses];
      [newCourses[index], newCourses[index - 1]] = [
        newCourses[index - 1],
        newCourses[index],
      ];
      newCourses.forEach((c, i) => (c.order = i + 1));
      setSelectedCourses(newCourses);
    }
  };

  const handleReorderCourseDown = (index) => {
    if (index < selectedCourses.length - 1) {
      const newCourses = [...selectedCourses];
      [newCourses[index], newCourses[index + 1]] = [
        newCourses[index + 1],
        newCourses[index],
      ];
      newCourses.forEach((c, i) => (c.order = i + 1));
      setSelectedCourses(newCourses);
    }
  };

  const filteredCourses = availableCourses.filter(
    (course) =>
      course?.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedCourses.find((c) => (c.course?._id || c.course) === course._id)
  );

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#00000043] bg-opacity-50 flex items-center justify-center z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Header */}
        <div
          className={`flex items-center justify-between mb-8 ${initialProfession ? "cursor-pointer select-none" : ""
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
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {initialProfession?.name
                  ? initialProfession.name
                  : "Create New Profession"}
              </h2>
              {!initialProfession && (
                <p className="text-sm text-gray-500 mt-1">
                  Build a new professional track for your learners
                </p>
              )}
            </div>
          </div>
          {initialProfession?.thumbnail && (
            <img
              src={initialProfession.thumbnail}
              alt="Profession thumbnail"
              className="w-16 h-16 object-cover rounded-xl shadow-md"
            />
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className={`space-y-6 transition-all duration-300 ${isCollapsed && initialProfession ? "hidden" : ""
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
            <div className="flex flex-col gap-4">
              <input
                ref={thumbnailRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500"
              />
              {(thumbnailPreview || initialProfession?.thumbnail) && (
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={thumbnailPreview || initialProfession?.thumbnail}
                    alt="Profession thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Courses
            </label>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowCourseDropdown(true);
                  }}
                  onKeyDown={handleCourseSearchKeyDown}
                  onFocus={() => setShowCourseDropdown(true)}
                  placeholder="Search and add courses..."
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 outline-none transition-all"
                />

                {showCourseDropdown && filteredCourses.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto bg-white z-10">
                    {filteredCourses.map((course) => (
                      <button
                        key={course._id}
                        type="button"
                        onClick={() => {
                          handleAddCourse(course);
                          setShowCourseDropdown(false);
                        }}
                        className="w-full text-left p-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center justify-between group"
                      >
                        <span className="text-gray-700">{course.title}</span>
                        <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          +
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {showCourseDropdown && filteredCourses.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded-lg shadow-lg bg-white z-10 p-4">
                    <p className="text-gray-500 text-sm text-center">
                      {searchQuery
                        ? "No courses found"
                        : "No more courses available"}
                    </p>
                  </div>
                )}
              </div>

              {selectedCourses.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-3 uppercase">
                    Selected Courses ({selectedCourses.length})
                  </p>
                  <div className="space-y-2">
                    {selectedCourses.map((course, index) => {
                      const courseTitle = course.course?.title || course.course;
                      const courseId = course.course?._id || course.course;
                      return (
                        <div
                          key={courseId}
                          className="flex items-center justify-between bg-white p-3 rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-blue-600 font-semibold text-sm w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full">
                              {index + 1}
                            </span>
                            <span className="text-gray-700 font-medium">
                              {courseTitle}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleReorderCourseUp(index)}
                              disabled={index === 0}
                              className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Move up"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReorderCourseDown(index)}
                              disabled={index === selectedCourses.length - 1}
                              className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Move down"
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveCourse(course.course)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors ml-1"
                              title="Remove course"
                            >
                              <FaTimes size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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

              {tags.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-3 uppercase">
                    Tags ({tags.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-white text-gray-700 px-3 py-2 rounded-full text-sm border border-gray-300 hover:border-gray-400 transition-colors"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-red-500 hover:text-red-700 transition-colors ml-1"
                        >
                          <FaTimes size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Processing..."
                : initialProfession
                  ? "Update Profession"
                  : "Create Profession"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfession;
