import { useMutation, useQuery } from "@tanstack/react-query";
import { authAPI } from "../api/api/auth.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials) => authAPI.login(credentials),
  });
};
