import axiosInstance from "../axiosInstance";

export const leaderboardAPI = {
  getAllLeaderboard: async () => {
    const response = await axiosInstance.get("/leaderboard/all-list");
    return response.data;
  },

  getLeaderboard: async () => {
    const response = await axiosInstance.get("/leaderboard");
    return response.data;
  },
};
