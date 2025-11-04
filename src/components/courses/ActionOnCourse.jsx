import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import CreateCourse from "./CreateCourse";
import ModuleForm from "./ModuleForm";
import { useSelector } from "react-redux";

const ActionOnCourse = () => {
  const [modules, setModules] = useState([]);
  const [activeModuleIndex, setActiveModuleIndex] = useState(null);
  const initialCourse = useSelector((state) => state.courses.initialCourse);

  useEffect(() => {
    if (initialCourse) {
      setModules(initialCourse.modules || []);
    }
  }, [initialCourse]);

  const submitModuleData = (moduleData) => {
    console.log(moduleData);
    if (moduleData._id) {
      // update existing module
    } else {
      // add new module
    }
  };

  const openNewModule = () => {
    if (activeModuleIndex !== null) return;
    setModules((prev) => [
      ...prev,
      {
        title: "",
        topics: "",
        theory: "",
        mcqs: "",
        codingTask: "",
        interviewQuestions: "",
      },
    ]);
    setActiveModuleIndex(modules.length);
  };

  const deleteModule = (id) => {
    console.log("Deleting module with id:", id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <CreateCourse />

        {initialCourse && (
          <div className="border-t mt-10 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-black">Modules -</h3>
              <button
                type="button"
                onClick={openNewModule}
                disabled={activeModuleIndex !== null}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
                  activeModuleIndex !== null
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                <FaPlus />
              </button>
            </div>

            {modules.map((module, index) => {
              const isOpen = activeModuleIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-lg overflow-hidden transition-all ${
                    isOpen ? "p-6" : "p-4"
                  } mb-4`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {module.title || `Module ${index + 1}`}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {/* {module.topics} */}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setActiveModuleIndex(isOpen ? null : index)
                        }
                        className="text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteModule(module._id)}
                        className="text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "mt-4" : "h-0"
                    }`}
                  >
                    {isOpen && (
                      <ModuleForm
                        module={module}
                        onSubmit={submitModuleData}
                        onCancel={() => setActiveModuleIndex(null)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionOnCourse;
