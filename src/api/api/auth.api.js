import axiosInstance from "../axiosInstance";

export const authAPI = {
  login: async (credentials) => {
    const response = await axiosInstance.post("/users/login", credentials);
    return response.data;
  },

  // sendOtp: async (email) => {
  //   const response = await axiosInstance.post("/admin/send-otp", { email });
  //   return response.data;
  // },

  // verifyOtp: async (email, otp) => {
  //   const response = await axiosInstance.post("/admin/verify-otp", { email, otp });
  //   return response.data;
  // },

  // newPassword: async (email, newPassword) => {
  //   const response = await axiosInstance.post("/admin/change-password", {
  //     email,
  //     newPassword,
  //   });
  //   return response.data;
  // },
  // changeEmail: async (newEmail, currentPassword) => {
  //   const response = await axiosInstance.post(
  //     "/admin/change-email",
  //     { newEmail, currentPassword }
  //   );
  //   return response.data;
  // }
};
