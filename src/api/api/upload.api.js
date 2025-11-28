import axiosInstance from "../axiosInstance";

export const uploadAPI = {
  uploadImg: async (file) => {
    const response = await axiosInstance.post("/users/upload-image", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
