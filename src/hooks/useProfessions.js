import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { professionAPI } from "../api/api/professions.api";

export const useGetAllProfessions = () => {
  return useQuery({
    queryKey: ["professions"],
    queryFn: professionAPI.getAllProfessions,
  });
};

export const useCreateProfession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (professionData) =>
      professionAPI.createProfession(professionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professions"] });
    },
  });
};

export const useUpdateProfession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ professionId, professionData }) =>
      professionAPI.updateProfession(professionId, professionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professions"] });
    },
  });
};

export const useAssignCourses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ professionId, courseIdsWithOrder }) =>
      professionAPI.assignCourses(professionId, courseIdsWithOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professions"] });
    },
  });
};

export const useDeleteProfession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (professionId) => professionAPI.deleteProfession(professionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professions"] });
    },
  });
};
