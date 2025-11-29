import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersAPI } from "../api/api/users.api";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: usersAPI.getAllUsers,
  });
};
