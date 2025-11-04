// CourseView.jsx
import { IoClose } from "react-icons/io5";

const ProfessionView = ({ profession, onClose }) => {
  return (
    <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-lg border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {profession.name}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
        >
          <IoClose />
        </button>
      </div>

      <img
        src={profession.thumbnail}
        alt={profession.name}
        className="w-full h-48 object-cover rounded-lg mb-6"
      />

      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Description</h3>
          <p className="text-gray-600">{profession.description}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-2">Duration</h3>
          <p className="text-gray-600">{profession.estimatedDuration}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-2">Courses</h3>
          <ul className="list-disc list-inside space-y-1">
            {profession.courses.map((course, index) => (
              <li key={index} className="text-gray-600">
                {course.course}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {profession.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionView;
