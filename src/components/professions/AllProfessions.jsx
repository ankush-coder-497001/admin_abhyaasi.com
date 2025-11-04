import { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setInitialProfession } from "../../redux/slices/professionsSlice";
import ProfessionView from "./ProfessionView";

const professions = [
  {
    _id: "cat1",
    name: "Full Stack Web Development",
    description:
      "Master both frontend and backend development using modern technologies like React, Node.js, Express, and MongoDB.",
    courses: [
      { course: "Introduction to HTML & CSS", order: 1 },
      { course: "React Fundamentals", order: 2 },
      { course: "Node.js & Express API Development", order: 3 },
    ],
    thumbnail:
       "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    estimatedDuration: "6 months",
    tags: ["web", "mern", "react", "nodejs", "mongodb"],
  },
  {
    _id: "cat2",
    name: "Data Science & Machine Learning",
    description:
      "A complete roadmap to learn Python, data analysis, machine learning, and deep learning with hands-on projects.",
    courses: [
      { course: "Python for Data Analysis", order: 1 },
      { course: "Machine Learning with Scikit-learn", order: 2 },
    ],
    thumbnail:
       "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    estimatedDuration: "5 months",
    tags: ["python", "ai", "ml", "data-science", "pandas", "tensorflow"],
  },
  {
    _id: "cat3",
    name: "UI/UX Design",
    description:
      "Learn to design user-friendly interfaces and intuitive experiences using Figma, Adobe XD, and design principles.",
    courses: [{ course: "Figma for Beginners", order: 1 }],
    thumbnail:
       "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    estimatedDuration: "3 months",
    tags: ["design", "figma", "ux", "prototyping", "usability"],
  },
  {
    _id: "cat4",
    name: "Cybersecurity & Ethical Hacking",
    description:
      "Learn how to secure systems, networks, and applications while understanding real-world hacking techniques.",
    courses: [
      { course: "Network Security Essentials", order: 1 },
      { course: "Ethical Hacking Fundamentals", order: 2 },
    ],
    thumbnail:
       "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",

    estimatedDuration: "4 months",
    tags: ["security", "hacking", "network", "pentesting"],
  },
  {
    _id: "cat5",
    name: "Cloud Computing & DevOps",
    description:
      "Understand cloud fundamentals, CI/CD pipelines, containerization, and infrastructure automation using AWS and Docker.",
    courses: [
      { course: "AWS Cloud Practitioner", order: 1 },
      { course: "Docker & Kubernetes Mastery", order: 2 },
      { course: "CI/CD with Jenkins", order: 3 },
    ],
    thumbnail:
       "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    estimatedDuration: "5 months",
    tags: ["cloud", "aws", "docker", "kubernetes", "ci/cd"],
  },
];

const AllProfessions = ({ setActiveView }) => {
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleEdit = (profession) => {
    setActiveView("create-profession");
    dispatch(setInitialProfession(profession));
  };

  const handleView = (profession) => setSelectedProfession(profession);
  const handleCloseView = () => setSelectedProfession(null);

  const handleDelete = (id) => {
    console.log("Delete profession:", id);
  };

  const filteredProfessions = professions.filter((profession) =>
    profession.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return selectedProfession ? (
    <ProfessionView profession={selectedProfession} onClose={handleCloseView} />
  ) : (
    <div className="w-full relative">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search professions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessions.map((profession) => (
          <div
            key={profession._id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all duration-200 flex flex-col"
          >
            <img
              src={profession.thumbnail}
              alt={profession.name}
              className="rounded-lg mb-4 h-40 w-full object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
              {profession.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {profession.description}
            </p>

            <div className="flex items-center text-gray-500 text-sm mb-3">
              <span>{profession.estimatedDuration}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {profession.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
              {profession.tags.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{profession.tags.length - 3}
                </span>
              )}
            </div>

            <div className="flex gap-4 mt-auto">
              <button
                onClick={() => handleEdit(profession)}
                className="flex items-center gap-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(profession._id)}
                className="flex items-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
              >
                <FaTrash />
              </button>
              <button
                onClick={() => handleView(profession)}
                className="flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
              >
                <FaEye />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProfessions;
