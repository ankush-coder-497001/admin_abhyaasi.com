import axiosInstance from "../axiosInstance";

export const usersAPI = {
  getAllUsers: async () => {
    const response = await axiosInstance.get("/users/get_all_users");
    return response.data;
  },
};
