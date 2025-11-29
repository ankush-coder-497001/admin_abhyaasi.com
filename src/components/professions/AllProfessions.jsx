import { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setInitialProfession } from "../../redux/slices/professionsSlice";
import ProfessionView from "./ProfessionView";
import ConfirmationModal from "../ui/ConfirmationModal";
import {
  useDeleteProfession,
  useGetAllProfessions,
} from "../../hooks/useProfessions";
import toast from "react-hot-toast";

const AllProfessions = ({ setActiveView }) => {
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    professionId: null,
    professionName: "",
  });
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetAllProfessions();
  const { mutate: deleteProfession } = useDeleteProfession();
  const professions = data?.professions || [];

  const handleEdit = (profession) => {
    setActiveView("create-profession");
    dispatch(setInitialProfession(profession));
  };

  const handleView = (profession) => setSelectedProfession(profession);
  const handleCloseView = () => setSelectedProfession(null);

  const handleDeleteClick = (profession) => {
    setDeleteConfirmation({
      isOpen: true,
      professionId: profession._id,
      professionName: profession.name,
    });
  };

  const handleConfirmDelete = () => {
    deleteProfession(deleteConfirmation.professionId, {
      onSuccess: () => {
        toast.success("Profession deleted successfully!");
        setDeleteConfirmation({
          isOpen: false,
          professionId: null,
          professionName: "",
        });
      },
      onError: (error) => {
        console.error("Error deleting profession:", error);
        toast.error("Failed to delete profession.");
        setDeleteConfirmation({
          isOpen: false,
          professionId: null,
          professionName: "",
        });
      },
    });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({
      isOpen: false,
      professionId: null,
      professionName: "",
    });
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

      {isLoading && (
        <div className="flex justify-center items-center h-96">
          <div className="text-lg text-gray-600">Loading professions...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error loading professions: {error.message}
        </div>
      )}

      {!isLoading && !error && professions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No professions available
        </div>
      )}

      {!isLoading && !error && professions.length > 0 && (
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

              <div className="flex gap-2 mt-auto flex-wrap">
                <button
                  onClick={() => handleEdit(profession)}
                  className="flex items-center gap-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
                  title="Edit profession details"
                >
                  <FaEdit />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(profession)}
                  className="flex items-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
                  title="Delete profession"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleView(profession)}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
                  title="View details"
                >
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        title="Delete Profession"
        message={`Are you sure you want to delete "${deleteConfirmation.professionName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default AllProfessions;
