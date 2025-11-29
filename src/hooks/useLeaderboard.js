import { useQuery } from "@tanstack/react-query";
import { leaderboardAPI } from "../api/api/leaderboard.api";

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: leaderboardAPI.getAllLeaderboard,
  });
};
