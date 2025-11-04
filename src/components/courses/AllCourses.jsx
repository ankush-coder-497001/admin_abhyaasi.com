import { useState } from "react";
import { FaClock, FaLayerGroup, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import CourseView from "./CourseView";
import { setInitialCourse } from "../../redux/slices/coursesSlice";
import { useDispatch } from "react-redux";

const courses = [
  {
    _id: "c1",
    title: "Introduction to Python",
    slug: "introduction-to-python",
    description:
      "A hands-on Python course designed to teach you programming fundamentals through examples, quizzes, and coding exercises.",
    difficulty: "medium",
    duration: "4 weeks",
    status: "draft",
    isPublished: true,
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
    createdAt: "2025-11-01T06:43:49.130Z",
    updatedAt: "2025-11-02T14:18:02.923Z",
    modules: [
      {
        _id: "m1",
        courseId: "c1",
        title: "Start With Basic Introduction",
        order: 1,
        published: false,
        isLastModule: false,
        theoryNotes: {
          text: `
            <h2>Introduction to Python</h2>
            <p>Python is simple, readable, and great for beginners.</p>
          `,
        },
        passCriteria: { mcqPassingPercent: 70, projectMustPass: true },
        topics: [
          {
            title: "Python Basics",
            content: "Syntax, variables, and data types.",
          },
          {
            title: "Setup Environment",
            content: "Install Python and VS Code.",
          },
          { title: "Hello World", content: "Write your first Python program." },
        ],
        mcqs: [
          {
            _id: "q1",
            question: "Who created Python?",
            options: [
              "James Gosling",
              "Guido van Rossum",
              "Dennis Ritchie",
              "Bjarne Stroustrup",
            ],
            correctOptionIndex: 1,
            explanation: "Guido van Rossum created Python in 1991.",
            maxAttempts: 3,
          },
        ],
        codingTask: {
          _id: "ct1",
          title: "Print Hello World",
          description: "Write a program that prints 'Hello, World!'",
          languages: ["python"],
          templateFiles: [
            { _id: "tf1", path: "main.py", content: "print('')" },
          ],
          testcases: [
            {
              id: "T1",
              type: "unit",
              input: "",
              expectedOutput: "Hello, World!",
              hidden: false,
            },
          ],
          timeoutSeconds: 30,
        },
        interviewQuestions: [
          {
            _id: "iq1",
            question: "Why Python is interpreted?",
            suggestedAnswer: "Code is executed line by line.",
          },
        ],
      },
    ],
  },

  {
    _id: "c2",
    title: "JavaScript Essentials",
    slug: "javascript-essentials",
    description:
      "Learn core JavaScript concepts, DOM manipulation, and modern ES6+ features.",
    difficulty: "medium",
    duration: "3 weeks",
    status: "published",
    isPublished: true,
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    createdAt: "2025-11-01T06:50:00.000Z",
    updatedAt: "2025-11-02T14:20:00.000Z",
    modules: [
      {
        _id: "m2",
        courseId: "c2",
        title: "JavaScript Basics",
        order: 1,
        published: true,
        isLastModule: false,
        theoryNotes: {
          text: "<p>Learn JS syntax, variables, functions, and DOM manipulation.</p>",
        },
        passCriteria: { mcqPassingPercent: 70, projectMustPass: true },
        topics: [
          {
            title: "Variables & Data Types",
            content: "let, const, var, and types.",
          },
          { title: "Functions", content: "Define and call functions." },
          {
            title: "DOM Basics",
            content: "Select and manipulate HTML elements.",
          },
        ],
        mcqs: [
          {
            _id: "q2",
            question: "Which company developed JavaScript?",
            options: ["Microsoft", "Sun Microsystems", "Netscape", "Oracle"],
            correctOptionIndex: 2,
            explanation: "Netscape developed JavaScript.",
            maxAttempts: 3,
          },
        ],
        codingTask: {
          _id: "ct2",
          title: "Console Log",
          description: "Print 'Hello JS' in the console.",
          languages: ["javascript"],
          templateFiles: [
            { _id: "tf2", path: "main.js", content: "console.log('');" },
          ],
          testcases: [
            {
              id: "T2",
              type: "unit",
              input: "",
              expectedOutput: "Hello JS",
              hidden: false,
            },
          ],
          timeoutSeconds: 30,
        },
        interviewQuestions: [
          {
            _id: "iq2",
            question: "What is hoisting in JS?",
            suggestedAnswer:
              "Variable and function declarations are moved to top.",
          },
        ],
      },
    ],
  },

  {
    _id: "c3",
    title: "React for Beginners",
    slug: "react-for-beginners",
    description: "Build interactive UI using React, components, and hooks.",
    difficulty: "medium",
    duration: "4 weeks",
    status: "draft",
    isPublished: false,
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    createdAt: "2025-11-01T07:00:00.000Z",
    updatedAt: "2025-11-02T14:25:00.000Z",
    modules: [
      {
        _id: "m3",
        courseId: "c3",
        title: "React Basics",
        order: 1,
        published: false,
        isLastModule: false,
        theoryNotes: {
          text: "<p>Learn JSX, components, props, and state management.</p>",
        },
        passCriteria: { mcqPassingPercent: 70, projectMustPass: true },
        topics: [
          { title: "JSX", content: "Syntax for React components." },
          {
            title: "Components & Props",
            content: "Create reusable components.",
          },
          {
            title: "State & Events",
            content: "Manage state and handle events.",
          },
        ],
        mcqs: [
          {
            _id: "q3",
            question: "What is JSX?",
            options: [
              "CSS framework",
              "HTML in JS",
              "Database",
              "Server-side code",
            ],
            correctOptionIndex: 1,
            explanation: "JSX allows writing HTML inside JS code.",
            maxAttempts: 3,
          },
        ],
        codingTask: {
          _id: "ct3",
          title: "Hello Component",
          description: "Render a simple 'Hello React' component.",
          languages: ["javascript", "react"],
          templateFiles: [
            {
              _id: "tf3",
              path: "App.js",
              content: "export default function App() { return <div></div> }",
            },
          ],
          testcases: [
            {
              id: "T3",
              type: "unit",
              input: "",
              expectedOutput: "Hello React",
              hidden: false,
            },
          ],
          timeoutSeconds: 30,
        },
        interviewQuestions: [
          {
            _id: "iq3",
            question: "What is a React component?",
            suggestedAnswer: "Reusable piece of UI.",
          },
        ],
      },
    ],
  },

  {
    _id: "c4",
    title: "Node.js Fundamentals",
    slug: "nodejs-fundamentals",
    description: "Learn backend development using Node.js, Express, and APIs.",
    difficulty: "hard",
    duration: "5 weeks",
    status: "published",
    isPublished: true,
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    createdAt: "2025-11-01T07:10:00.000Z",
    updatedAt: "2025-11-02T14:30:00.000Z",
    modules: [
      {
        _id: "m4",
        courseId: "c4",
        title: "Node.js Basics",
        order: 1,
        published: true,
        isLastModule: false,
        theoryNotes: {
          text: "<p>Learn server-side JS with Node.js and Express.</p>",
        },
        passCriteria: { mcqPassingPercent: 70, projectMustPass: true },
        topics: [
          {
            title: "Node Environment",
            content: "Install Node and run scripts.",
          },
          { title: "Express Basics", content: "Create REST APIs." },
          { title: "Middleware", content: "Handle requests and responses." },
        ],
        mcqs: [
          {
            _id: "q4",
            question: "Which module is used to create a server in Node.js?",
            options: ["http", "fs", "path", "url"],
            correctOptionIndex: 0,
            explanation: "The http module creates servers.",
            maxAttempts: 3,
          },
        ],
        codingTask: {
          _id: "ct4",
          title: "Simple API",
          description: "Create a GET API returning JSON message.",
          languages: ["javascript", "node"],
          templateFiles: [
            {
              _id: "tf4",
              path: "index.js",
              content: "const http = require('http');",
            },
          ],
          testcases: [
            {
              id: "T4",
              type: "unit",
              input: "",
              expectedOutput: '{"message":"ok"}',
              hidden: false,
            },
          ],
          timeoutSeconds: 30,
        },
        interviewQuestions: [
          {
            _id: "iq4",
            question: "What is Node.js?",
            suggestedAnswer: "Server-side JavaScript runtime.",
          },
        ],
      },
    ],
  },

  {
    _id: "c5",
    title: "Data Structures & Algorithms",
    slug: "data-structures-algorithms",
    description:
      "Master fundamental DS & Algo concepts for interviews and problem-solving.",
    difficulty: "hard",
    duration: "6 weeks",
    status: "draft",
    isPublished: false,
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Data-structure.png",
    createdAt: "2025-11-01T07:20:00.000Z",
    updatedAt: "2025-11-02T14:35:00.000Z",
    modules: [
      {
        _id: "m5",
        courseId: "c5",
        title: "Introduction to DS",
        order: 1,
        published: false,
        isLastModule: false,
        theoryNotes: {
          text: "<p>Learn arrays, linked lists, stacks, and queues.</p>",
        },
        passCriteria: { mcqPassingPercent: 70, projectMustPass: true },
        topics: [
          { title: "Arrays", content: "Static and dynamic arrays." },
          { title: "Linked Lists", content: "Singly and doubly linked lists." },
          {
            title: "Stacks & Queues",
            content: "LIFO and FIFO data structures.",
          },
        ],
        mcqs: [
          {
            _id: "q5",
            question: "Which data structure uses LIFO?",
            options: ["Stack", "Queue", "Array", "Linked List"],
            correctOptionIndex: 0,
            explanation: "Stack uses Last-In-First-Out.",
            maxAttempts: 3,
          },
        ],
        codingTask: {
          _id: "ct5",
          title: "Reverse Array",
          description: "Write a function to reverse an array.",
          languages: ["javascript", "python"],
          templateFiles: [
            {
              _id: "tf5",
              path: "reverse.js",
              content: "function reverse(arr) {}",
            },
          ],
          testcases: [
            {
              id: "T5",
              type: "unit",
              input: "[1,2,3]",
              expectedOutput: "[3,2,1]",
              hidden: false,
            },
          ],
          timeoutSeconds: 30,
        },
        interviewQuestions: [
          {
            _id: "iq5",
            question: "Difference between stack and queue?",
            suggestedAnswer: "Stack is LIFO, Queue is FIFO.",
          },
        ],
      },
    ],
  },
];

const AllCourses = ({ setActiveView }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const dispatch = useDispatch();

  const handleView = (course) => setSelectedCourse(course);
  const handleCloseView = () => setSelectedCourse(null);

  const filteredCourses = courses.filter((course) => {
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

  const handleDelete = () => {};

  return (
    <div className="w-full relative">
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
                className={`px-4 py-2 rounded-lg ${
                  statusFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("draft")}
                className={`px-4 py-2 rounded-lg ${
                  statusFilter === "draft"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => setStatusFilter("published")}
                className={`px-4 py-2 rounded-lg ${
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
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all duration-200 flex flex-col"
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
