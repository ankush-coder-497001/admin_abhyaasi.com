import axiosInstance from "../axiosInstance";

export const professionAPI = {
  createProfession: async (professionData) => {
    const response = await axiosInstance.post(
      "/professions/create",
      professionData
    );
    return response.data;
  },

  getAllProfessions: async () => {
    const response = await axiosInstance.get("/professions/get_all");
    return response.data;
  },

  updateProfession: async (professionId, professionData) => {
    const response = await axiosInstance.put(
      `/professions/${professionId}`,
      professionData
    );
    return response.data;
  },

  deleteProfession: async (professionId) => {
    const response = await axiosInstance.delete(`/professions/${professionId}`);
    return response.data;
  },

  assignCourses: async (professionId, courseIdsWithOrder) => {
    const response = await axiosInstance.post(
      `/professions/assign_courses/${professionId}`,
      { courseIdsWithOrder }
    );
    return response.data;
  },
};
