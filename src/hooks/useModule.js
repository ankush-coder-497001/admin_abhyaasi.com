import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { modulesAPI } from "../api/api/modules.api";

export const useCreateModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (moduleData) => modulesAPI.createModule(moduleData),
  });
};

export const useUpdateModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ moduleId, moduleData }) =>
      modulesAPI.updateModule(moduleId, moduleData),
  });
};

export const useDeleteModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (moduleId) => modulesAPI.deleteModule(moduleId),
  });
};
