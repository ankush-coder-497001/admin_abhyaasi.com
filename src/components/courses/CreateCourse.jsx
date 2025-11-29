import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { setInitialCourse } from "../../redux/slices/coursesSlice";
import { useDispatch } from "react-redux";
import { useCreateCourse, useUpdateCourse } from "../../hooks/useCourse";
import { useUploadImg } from "../../hooks/useUpload";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";

const CreateCourse = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const difficultyRef = useRef();
  const durationRef = useRef();
  const thumbnailUrlRef = useRef();
  const statusRef = useRef();
  const isPublishedRef = useRef();
  const dispatch = useDispatch();

  const initialCourse = useSelector((state) => state.courses.initialCourse);

  const { mutate: uploadImg, isPending: isUploadingImg } = useUploadImg();
  const { mutate: updateCourse, isPending: isUpdatingCourse } =
    useUpdateCourse();
  const { mutate: createCourse, isPending: isCreatingCourse } =
    useCreateCourse();

  const isLoading = isUploadingImg || isUpdatingCourse || isCreatingCourse;

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

  const handleSubmitCourse = async (e) => {
    e.preventDefault();

    if (!initialCourse) {
      if (!thumbnailUrlRef.current.files.length) {
        toast.error("Please upload a thumbnail image for the course.");
        return;
      }
    }

    let imageUrl =
      thumbnailUrlRef.current.value || initialCourse?.thumbnailUrl || "";

    // Upload image if a new one is selected
    if (thumbnailUrlRef.current.files.length > 0) {
      return uploadImg(
        { image: thumbnailUrlRef.current.files[0] },
        {
          onSuccess: (data) => {
            imageUrl = data.url;
            submitCourseData(imageUrl);
          },
          onError: (error) => {
            toast.error("Failed: Image upload failed");
            console.log(error);
          },
        }
      );
    }

    // If no image to upload, submit directly
    submitCourseData(imageUrl);
  };

  const submitCourseData = (imageUrl) => {
    const courseData = {
      title: titleRef.current.value.trim(),
      description: descriptionRef.current.value.trim(),
      difficulty: difficultyRef.current.value,
      duration: durationRef.current.value.trim(),
      thumbnailUrl: imageUrl,
      status: statusRef.current.value,
      isPublished: isPublishedRef.current.checked,
    };

    if (initialCourse) {
      updateCourse(
        { courseId: initialCourse._id, courseData },
        {
          onSuccess: (data) => {
            console.log(data);
            toast.success("Course updated successfully!");
            dispatch(setInitialCourse(data.course));
          },
          onError: (error) => {
            toast.error("Course update failed");
            console.log(error);
          },
        }
      );
    } else {
      createCourse(courseData, {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Course created successfully!");
          dispatch(setInitialCourse(data.course));
        },
        onError: (error) => {
          toast.error("Course creation failed");
        },
      });
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
      {isLoading && (
        <div className="fixed inset-0 bg-[#00000043] bg-opacity-50 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
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
          <div className="flex flex-col gap-4">
            <input
              ref={thumbnailUrlRef}
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500"
            />
            {(thumbnailPreview || initialCourse?.thumbnailUrl) && (
              <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={thumbnailPreview || initialCourse?.thumbnailUrl}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : initialCourse ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
