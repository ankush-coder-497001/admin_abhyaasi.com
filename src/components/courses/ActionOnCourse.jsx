import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import CreateCourse from "./CreateCourse";
import ModuleForm from "./ModuleForm";
import { useSelector } from "react-redux";
import {
  useCreateModule,
  useUpdateModule,
  useDeleteModule,
} from "../../hooks/useModule";
import Loader from "../ui/Loader";
import ConfirmationModal from "../ui/ConfirmationModal";
import toast from "react-hot-toast";

const ActionOnCourse = () => {
  const [modules, setModules] = useState([]);
  const [activeModuleIndex, setActiveModuleIndex] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const initialCourse = useSelector((state) => state.courses.initialCourse);

  const { mutate: createModule, isPending: isCreatingModule } =
    useCreateModule();
  const { mutate: updateModule, isPending: isUpdatingModule } =
    useUpdateModule();
  const { mutate: deleteModuleMutation, isPending: isDeletingModule } =
    useDeleteModule();

  const isLoading = isCreatingModule || isUpdatingModule || isDeletingModule;

  useEffect(() => {
    if (initialCourse) {
      setModules(initialCourse.modules || []);
    }
  }, [initialCourse]);

  const submitModuleData = (formData) => {
    // Transform form data to API format
    // Add IDs to testcases if they don't have them
    const codingTaskWithIds = formData.codingTask && {
      ...formData.codingTask,
      testcases: formData.codingTask.testcases.map((tc, index) => ({
        ...tc,
        id: tc.id || `T${index + 1}`, // Generate ID like T1, T2, etc if not present
      })),
    };

    const apiData = {
      title: formData.title,
      order: formData.order,
      published: formData.published,
      isLastModule: formData.isLastModule,
      courseId: initialCourse._id,
      topics: formData.topics,
      theoryNotes: formData.theoryNotes, // Keep as theoryNotes (model uses this structure)
      passCriteria: formData.passCriteria,
      mcqs: formData.mcqs,
      codingTask: codingTaskWithIds,
      interviewQuestions: formData.interviewQuestions,
    };

    if (formData._id) {
      // Update existing module
      updateModule(
        { moduleId: formData._id, moduleData: apiData },
        {
          onSuccess: (data) => {
            toast.success("Module updated successfully!");
            const updatedModule = data?.module || data?.data || data;
            setModules((prev) =>
              prev.map((m) =>
                m._id === updatedModule?._id ? updatedModule : m
              )
            );
            setActiveModuleIndex(null);
          },
          onError: (error) => {
            toast.error("Failed to update module");
            console.error(error);
          },
        }
      );
    } else {
      // Create new module
      createModule(apiData, {
        onSuccess: (data) => {
          toast.success("Module created successfully!");
          const newModule = data?.module || data?.data || data;
          if (newModule) {
            setModules((prev) => [...prev, newModule]);
          }
          setActiveModuleIndex(null);
        },
        onError: (error) => {
          toast.error("Failed to create module");
          console.error(error);
        },
      });
    }
  };

  const openNewModule = () => {
    if (activeModuleIndex !== null) return;
    setModules((prev) => [
      ...prev,
      {
        _id: null, // Mark as new module (no _id)
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

  const handleCancelModule = () => {
    // If it's a new module (no _id), remove it from the list
    if (!modules[activeModuleIndex]?._id) {
      setModules((prev) => prev.filter((_, i) => i !== activeModuleIndex));
    }
    setActiveModuleIndex(null);
  };

  const deleteModule = (id) => {
    setModuleToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (moduleToDelete) {
      deleteModuleMutation(moduleToDelete, {
        onSuccess: () => {
          toast.success("Module deleted successfully!");
          setModules((prev) => prev.filter((m) => m._id !== moduleToDelete));
          setShowConfirmation(false);
          setModuleToDelete(null);
        },
        onError: (error) => {
          toast.error("Failed to delete module");
          console.error(error);
          setShowConfirmation(false);
          setModuleToDelete(null);
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setModuleToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ConfirmationModal
        isOpen={showConfirmation}
        title="Delete Module"
        message="Are you sure you want to delete this module? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
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

            {modules.filter(Boolean).map((module, index) => {
              const isOpen = activeModuleIndex === index;
              return (
                <div
                  key={module?._id || index}
                  className={`border rounded-lg overflow-hidden transition-all ${
                    isOpen ? "p-6" : "p-4"
                  } mb-4`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {module?.title || `Module ${index + 1}`}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {/* {module.topics} */}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (isOpen && !modules[activeModuleIndex]?._id) {
                            // If closing a new unsaved module, remove it
                            setModules((prev) =>
                              prev.filter((_, i) => i !== activeModuleIndex)
                            );
                          }
                          setActiveModuleIndex(isOpen ? null : index);
                        }}
                        className="text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteModule(module?._id)}
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
                        onCancel={handleCancelModule}
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
