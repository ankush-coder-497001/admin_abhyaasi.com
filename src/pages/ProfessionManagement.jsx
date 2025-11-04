import { useState } from "react";
import { useSelector } from "react-redux";
import AllProfessions from "../components/professions/AllProfessions";
import CreateProfession from "../components/professions/CreateProfession";

const ProfessionManagement = () => {
  const [activeView, setActiveView] = useState("all-professions");
  const initialProfession = useSelector(
    (state) => state.profession.initialProfession
  );

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {activeView === "create-profession" && !initialProfession
            ? "Create New Profession"
            : initialProfession
            ? "Edit Profession"
            : "All Professions"}
        </h1>
        <button
          onClick={() =>
            handleViewChange(
              activeView === "all-professions"
                ? "create-profession"
                : "all-professions"
            )
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          {activeView === "all-professions" ? "Create New" : "View All"}
        </button>
      </div>

      {activeView === "all-professions" ? (
        <AllProfessions setActiveView={setActiveView} />
      ) : (
        <CreateProfession />
      )}
    </div>
  );
};

export default ProfessionManagement;
