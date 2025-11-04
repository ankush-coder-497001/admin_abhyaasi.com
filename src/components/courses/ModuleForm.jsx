import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const ModuleForm = ({ module, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    _id: module?._id || "",
    title: module?.title || "",
    order: module?.order || 1,
    published: module?.published || false,
    isLastModule: module?.isLastModule || false,
    theoryNotes: {
      text: module?.theoryNotes?.text || "",
    },
    passCriteria: {
      mcqPassingPercent: module?.passCriteria?.mcqPassingPercent || 70,
      projectMustPass: module?.passCriteria?.projectMustPass || true,
    },
    topics: module?.topics || [{ title: "", content: "" }],
    mcqs: module?.mcqs || [
      {
        question: "",
        options: ["", "", "", ""],
        correctOptionIndex: 0,
        explanation: "",
        maxAttempts: 3,
      },
    ],
    codingTask: module?.codingTask || {
      title: "",
      description: "",
      languages: ["python"],
      templateFiles: [
        {
          path: "main.py",
          content: "",
        },
      ],
      testcases: [
        {
          type: "unit",
          input: "",
          expectedOutput: "",
          hidden: false,
        },
      ],
      timeoutSeconds: 30,
    },
    interviewQuestions: module?.interviewQuestions || [
      { question: "", suggestedAnswer: "" },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Topics handlers
  const addTopic = () => {
    setFormData({
      ...formData,
      topics: [...formData.topics, { title: "", content: "" }],
    });
  };

  const removeTopic = (index) => {
    setFormData({
      ...formData,
      topics: formData.topics.filter((_, i) => i !== index),
    });
  };

  const updateTopic = (index, field, value) => {
    const newTopics = [...formData.topics];
    newTopics[index] = { ...newTopics[index], [field]: value };
    setFormData({ ...formData, topics: newTopics });
  };

  // MCQs handlers
  const addMCQ = () => {
    setFormData({
      ...formData,
      mcqs: [
        ...formData.mcqs,
        {
          question: "",
          options: ["", "", "", ""],
          correctOptionIndex: 0,
          explanation: "",
          maxAttempts: 3,
        },
      ],
    });
  };

  const removeMCQ = (index) => {
    setFormData({
      ...formData,
      mcqs: formData.mcqs.filter((_, i) => i !== index),
    });
  };

  const updateMCQ = (index, field, value) => {
    const newMCQs = [...formData.mcqs];
    if (field === "options") {
      const optionIndex = value.optionIndex;
      newMCQs[index].options[optionIndex] = value.text;
    } else {
      newMCQs[index] = { ...newMCQs[index], [field]: value };
    }
    setFormData({ ...formData, mcqs: newMCQs });
  };

  // Interview Questions handlers
  const addInterviewQuestion = () => {
    setFormData({
      ...formData,
      interviewQuestions: [
        ...formData.interviewQuestions,
        { question: "", suggestedAnswer: "" },
      ],
    });
  };

  const removeInterviewQuestion = (index) => {
    setFormData({
      ...formData,
      interviewQuestions: formData.interviewQuestions.filter(
        (_, i) => i !== index
      ),
    });
  };

  const updateInterviewQuestion = (index, field, value) => {
    const newQuestions = [...formData.interviewQuestions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setFormData({ ...formData, interviewQuestions: newQuestions });
  };

  // Test cases handlers
  const addTestCase = () => {
    const newCodingTask = { ...formData.codingTask };
    newCodingTask.testcases.push({
      type: "unit",
      input: "",
      expectedOutput: "",
      hidden: false,
    });
    setFormData({ ...formData, codingTask: newCodingTask });
  };

  const removeTestCase = (index) => {
    const newCodingTask = { ...formData.codingTask };
    newCodingTask.testcases = newCodingTask.testcases.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, codingTask: newCodingTask });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-6">Basic Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) })
                }
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                min="1"
              />
            </div>
            <div className="flex items-center space-x-6 mt-6">
              <label className="flex items-center py-1">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Published</span>
              </label>
              <label className="flex items-center py-1">
                <input
                  type="checkbox"
                  checked={formData.isLastModule}
                  onChange={(e) =>
                    setFormData({ ...formData, isLastModule: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Final Module</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Notes */}
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-6">Theory Notes</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={formData.theoryNotes.text}
            onChange={(e) =>
              setFormData({
                ...formData,
                theoryNotes: { text: e.target.value },
              })
            }
            rows="6"
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Pass Criteria */}
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-6">Pass Criteria</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              MCQ Passing Percentage
            </label>
            <input
              type="number"
              value={formData.passCriteria.mcqPassingPercent}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  passCriteria: {
                    ...formData.passCriteria,
                    mcqPassingPercent: parseInt(e.target.value),
                  },
                })
              }
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              min="0"
              max="100"
            />
          </div>
          <div className="flex items-center py-1">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.passCriteria.projectMustPass}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    passCriteria: {
                      ...formData.passCriteria,
                      projectMustPass: e.target.checked,
                    },
                  })
                }
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Project Must Pass
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Topics</h3>
          <button
            type="button"
            onClick={addTopic}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Topic
          </button>
        </div>
        <div className="space-y-4">
          {formData.topics.map((topic, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={topic.title}
                  onChange={(e) => updateTopic(index, "title", e.target.value)}
                  placeholder="Topic Title"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
                <textarea
                  value={topic.content}
                  onChange={(e) =>
                    updateTopic(index, "content", e.target.value)
                  }
                  placeholder="Topic Content"
                  rows="2"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => removeTopic(index)}
                className="text-red-600 hover:text-red-800 py-1"
              >
                <RiDeleteBin6Line className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MCQs */}
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Multiple Choice Questions</h3>
          <button
            type="button"
            onClick={addMCQ}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add MCQ
          </button>
        </div>
        <div className="space-y-6">
          {formData.mcqs.map((mcq, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <div className="flex justify-between">
                <h4 className="font-medium">Question {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeMCQ(index)}
                  className="text-red-600 hover:text-red-800 py-1"
                >
                  <RiDeleteBin6Line className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3 mt-3">
                <textarea
                  value={mcq.question}
                  onChange={(e) => updateMCQ(index, "question", e.target.value)}
                  placeholder="Question"
                  rows="2"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="space-y-2">
                  {mcq.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className="flex items-center gap-3 py-1"
                    >
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={mcq.correctOptionIndex === optIndex}
                        onChange={() =>
                          updateMCQ(index, "correctOptionIndex", optIndex)
                        }
                        className="border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updateMCQ(index, "options", {
                            optionIndex: optIndex,
                            text: e.target.value,
                          })
                        }
                        placeholder={`Option ${optIndex + 1}`}
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
                <textarea
                  value={mcq.explanation}
                  onChange={(e) =>
                    updateMCQ(index, "explanation", e.target.value)
                  }
                  placeholder="Explanation"
                  rows="2"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    Max Attempts
                  </label>
                  <input
                    type="number"
                    value={mcq.maxAttempts}
                    onChange={(e) =>
                      updateMCQ(index, "maxAttempts", parseInt(e.target.value))
                    }
                    min="1"
                    className="mt-2 block w-32 rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coding Task */}
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-6">Coding Task</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.codingTask.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  codingTask: { ...formData.codingTask, title: e.target.value },
                })
              }
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.codingTask.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  codingTask: {
                    ...formData.codingTask,
                    description: e.target.value,
                  },
                })
              }
              rows="3"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Languages
            </label>
            <input
              type="text"
              value={formData.codingTask.languages.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  codingTask: {
                    ...formData.codingTask,
                    languages: e.target.value
                      .split(",")
                      .map((lang) => lang.trim()),
                  },
                })
              }
              placeholder="python, javascript, etc."
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Timeout (seconds)
            </label>
            <input
              type="number"
              value={formData.codingTask.timeoutSeconds}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  codingTask: {
                    ...formData.codingTask,
                    timeoutSeconds: parseInt(e.target.value),
                  },
                })
              }
              min="1"
              className="mt-2 block w-32 rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Template Files */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template Files
            </label>
            {formData.codingTask.templateFiles.map((file, index) => (
              <div key={index} className="space-y-2 mb-4">
                <input
                  type="text"
                  value={file.path}
                  onChange={(e) => {
                    const newFiles = [...formData.codingTask.templateFiles];
                    newFiles[index] = { ...file, path: e.target.value };
                    setFormData({
                      ...formData,
                      codingTask: {
                        ...formData.codingTask,
                        templateFiles: newFiles,
                      },
                    });
                  }}
                  placeholder="File path (e.g., main.py)"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
                <textarea
                  value={file.content}
                  onChange={(e) => {
                    const newFiles = [...formData.codingTask.templateFiles];
                    newFiles[index] = { ...file, content: e.target.value };
                    setFormData({
                      ...formData,
                      codingTask: {
                        ...formData.codingTask,
                        templateFiles: newFiles,
                      },
                    });
                  }}
                  placeholder="Template code"
                  rows="3"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Test Cases */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Test Cases
              </label>
              <button
                type="button"
                onClick={addTestCase}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Test Case
              </button>
            </div>
            {formData.codingTask.testcases.map((testcase, index) => (
              <div key={index} className="border p-4 rounded-md mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">Test Case {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeTestCase(index)}
                    className="text-red-600 hover:text-red-800 py-1"
                  >
                    <RiDeleteBin6Line className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  <select
                    value={testcase.type}
                    onChange={(e) => {
                      const newTestcases = [...formData.codingTask.testcases];
                      newTestcases[index] = {
                        ...testcase,
                        type: e.target.value,
                      };
                      setFormData({
                        ...formData,
                        codingTask: {
                          ...formData.codingTask,
                          testcases: newTestcases,
                        },
                      });
                    }}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="unit">Unit Test</option>
                    <option value="integration">Integration Test</option>
                  </select>
                  <input
                    type="text"
                    value={testcase.input}
                    onChange={(e) => {
                      const newTestcases = [...formData.codingTask.testcases];
                      newTestcases[index] = {
                        ...testcase,
                        input: e.target.value,
                      };
                      setFormData({
                        ...formData,
                        codingTask: {
                          ...formData.codingTask,
                          testcases: newTestcases,
                        },
                      });
                    }}
                    placeholder="Input"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={testcase.expectedOutput}
                    onChange={(e) => {
                      const newTestcases = [...formData.codingTask.testcases];
                      newTestcases[index] = {
                        ...testcase,
                        expectedOutput: e.target.value,
                      };
                      setFormData({
                        ...formData,
                        codingTask: {
                          ...formData.codingTask,
                          testcases: newTestcases,
                        },
                      });
                    }}
                    placeholder="Expected Output"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <label className="flex items-center py-1">
                    <input
                      type="checkbox"
                      checked={testcase.hidden}
                      onChange={(e) => {
                        const newTestcases = [...formData.codingTask.testcases];
                        newTestcases[index] = {
                          ...testcase,
                          hidden: e.target.checked,
                        };
                        setFormData({
                          ...formData,
                          codingTask: {
                            ...formData.codingTask,
                            testcases: newTestcases,
                          },
                        });
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Hidden Test Case
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interview Questions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Interview Questions</h3>
          <button
            type="button"
            onClick={addInterviewQuestion}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Question
          </button>
        </div>
        <div className="space-y-4">
          {formData.interviewQuestions.map((question, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) =>
                    updateInterviewQuestion(index, "question", e.target.value)
                  }
                  placeholder="Question"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
                <textarea
                  value={question.suggestedAnswer}
                  onChange={(e) =>
                    updateInterviewQuestion(
                      index,
                      "suggestedAnswer",
                      e.target.value
                    )
                  }
                  placeholder="Suggested Answer"
                  rows="2"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => removeInterviewQuestion(index)}
                className="text-red-600 hover:text-red-800"
              >
                <RiDeleteBin6Line className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ModuleForm;
