import axiosInstance from "../axiosInstance";

export const courseAPI = {
  getAllCourses: async () => {
    const response = await axiosInstance.get("/courses/get-all-list");
    return response.data;
  },

  createCourse: async (courseData) => {
    const response = await axiosInstance.post("/courses/create", courseData);
    return response.data;
  },

  updateCourse: async (courseId, courseData) => {
    const response = await axiosInstance.put(
      `/courses/update/${courseId}`,
      courseData
    );
    return response.data;
  },

  deleteCourse: async (courseId) => {
    const response = await axiosInstance.delete(`/courses/delete/${courseId}`);
    return response.data;
  },
};
