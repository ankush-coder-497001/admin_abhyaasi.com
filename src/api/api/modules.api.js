import axiosInstance from "../axiosInstance";

export const modulesAPI = {
  //   getAllModules: async () => {
  //     const response = await axiosInstance.get("/courses/get_all");
  //     return response.data;
  //   },

  createModule: async (moduleData) => {
    const response = await axiosInstance.post("/modules/create", moduleData);
    return response.data;
  },

  updateModule: async (moduleId, moduleData) => {
    const response = await axiosInstance.put(
      `/modules/edit/${moduleId}`,
      moduleData
    );
    return response.data;
  },

  //   deleteModule: async (moduleId) => {
  //     const response = await axiosInstance.delete(`/courses/delete/${moduleId}`);
  //     return response.data;
  //   },
};
