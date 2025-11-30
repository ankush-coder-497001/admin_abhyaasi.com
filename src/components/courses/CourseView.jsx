// CourseView.jsx
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const CourseView = ({ course, onClose }) => {
  const [expandedModule, setExpandedModule] = useState(null);

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded space-y-6">
      {/* Course Header */}
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute right-0 top-0 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close course view"
        >
          <IoClose className="w-6 h-6 text-gray-600 cursor-pointer" />
        </button>
        <div className="flex items-center space-x-4">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-24 h-24 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-sm text-blue-600">Slug: {course.slug}</p>
            <p className="text-gray-500 mt-2">{course.description}</p>
            <div className="mt-3 space-y-2">
              <div className="text-sm text-gray-600 flex flex-wrap gap-3">
                <span className="inline-flex items-center">
                  <span className="font-semibold mr-1">Difficulty:</span>
                  <span
                    className={`px-2 py-0.5 rounded ${course.difficulty === "easy"
                      ? "bg-green-100 text-green-800"
                      : course.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                      }`}
                  >
                    {course.difficulty}
                  </span>
                </span>
                <span>
                  <span className="font-semibold">Duration:</span>{" "}
                  {course.duration}
                </span>
                <span>
                  <span className="font-semibold">Status:</span> {course.status}
                </span>
                <span
                  className={`inline-flex items-center ${course.isPublished ? "text-green-600" : "text-red-600"
                    }`}
                >
                  <span className="font-semibold">Published:</span>{" "}
                  {course.isPublished ? " Yes" : " No"}
                </span>
              </div>
              <div className="text-sm text-gray-600 flex flex-wrap gap-3">
                <span>
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(course.createdAt).toLocaleDateString()}
                </span>
                <span>
                  <span className="font-semibold">Last Updated:</span>{" "}
                  {new Date(course.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Modules</h2>
        {course.modules.map((mod) => (
          <div
            key={mod._id}
            className="border rounded shadow-sm p-4 cursor-pointer"
          >
            <div
              className="flex justify-between items-center"
              onClick={() => toggleModule(mod._id)}
            >
              <div>
                <h3 className="font-bold">{mod.title}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  <span className="mr-3">Order: {mod.order}</span>
                  <span className="mr-3">
                    Published: {mod.published ? "Yes" : "No"}
                  </span>
                  {mod.isLastModule && (
                    <span className="text-blue-600">Final Module</span>
                  )}
                </div>
              </div>
              <span>{expandedModule === mod._id ? "-" : "+"}</span>
            </div>

            {expandedModule === mod._id && (
              <div className="mt-4 space-y-3">
                {/* Theory Notes */}
                <div>
                  <h4 className="font-semibold">Theory Notes</h4>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: mod?.theoryNotes?.text }}
                  />
                </div>

                {/* Topics */}
                <div>
                  <h4 className="font-semibold">Topics</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {mod.topics.map((topic, idx) => (
                      <li key={idx}>
                        <strong>{topic.title}:</strong> {topic.content}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pass Criteria */}
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-blue-800">Pass Criteria</h4>
                  <div className="text-sm text-blue-700 mt-1">
                    <p>
                      MCQ Passing Score: {mod.passCriteria.mcqPassingPercent}%
                    </p>
                    <p>
                      Project Must Pass:{" "}
                      {mod.passCriteria.projectMustPass ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                {/* MCQs */}
                {mod.mcqs.length > 0 && (
                  <div>
                    <h4 className="font-semibold">MCQs</h4>
                    <ul className="space-y-4">
                      {mod.mcqs.map((q) => (
                        <li
                          key={q._id}
                          className="border-l-4 border-blue-200 pl-4"
                        >
                          <p className="font-medium">{q.question}</p>
                          <ul className="list-decimal pl-5 mt-2">
                            {q.options.map((opt, i) => (
                              <li
                                key={i}
                                className={
                                  i === q.correctOptionIndex
                                    ? "text-green-600 font-medium"
                                    : ""
                                }
                              >
                                {opt}
                                {i === q.correctOptionIndex && " ✓"}
                              </li>
                            ))}
                          </ul>
                          <div className="text-sm mt-2">
                            <p className="text-gray-500">
                              <span className="font-medium">Explanation:</span>{" "}
                              {q.explanation}
                            </p>
                            <p className="text-blue-600">
                              <span className="font-medium">Max Attempts:</span>{" "}
                              {q.maxAttempts}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Coding Task */}
                {mod.codingTask && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold">Coding Task</h4>
                    <div className="space-y-3 mt-2">
                      <p>
                        <strong>{mod.codingTask.title}:</strong>{" "}
                        {mod.codingTask.description}
                      </p>
                      <div className="text-sm">
                        <p>
                          <span className="font-medium">Languages:</span>{" "}
                          {mod.codingTask.languages.join(", ")}
                        </p>
                        <p>
                          <span className="font-medium">Timeout:</span>{" "}
                          {mod.codingTask.timeoutSeconds} seconds
                        </p>
                      </div>
                      {mod.codingTask.templateFiles.map((file) => (
                        <div
                          key={file._id}
                          className="bg-white p-3 rounded border"
                        >
                          <p className="text-sm font-medium mb-1">
                            Template File: {file.path}
                          </p>
                          <pre className="text-sm bg-gray-100 p-2 rounded">
                            {file.content}
                          </pre>
                        </div>
                      ))}
                      <div className="mt-2">
                        <p className="font-medium text-sm mb-2">Test Cases:</p>
                        <div className="space-y-2">
                          {mod?.codingTask?.testcases.map((test) => (
                            <div
                              key={test.id}
                              className="text-sm bg-white p-2 rounded border"
                            >
                              <p>
                                <span className="font-medium">ID:</span>{" "}
                                {test.id}
                              </p>
                              <p>
                                <span className="font-medium">Type:</span>{" "}
                                {test.type}
                              </p>
                              {!test.hidden && (
                                <>
                                  <p>
                                    <span className="font-medium">Input:</span>{" "}
                                    {test.input || "None"}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Expected Output:
                                    </span>{" "}
                                    {test.expectedOutput}
                                  </p>
                                </>
                              )}
                              {test.hidden && (
                                <p className="text-gray-500 italic">
                                  Hidden test case
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Interview Questions */}
                {mod.interviewQuestions.length > 0 && (
                  <div>
                    <h4 className="font-semibold">Interview Questions</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {mod.interviewQuestions.map((iq) => (
                        <li key={iq._id}>
                          <strong>{iq.question}</strong> - {iq.suggestedAnswer}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseView;
