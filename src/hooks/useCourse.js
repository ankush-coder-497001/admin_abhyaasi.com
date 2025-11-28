import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { courseAPI } from "../api/api/course.api";

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: courseAPI.getAllCourses,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseData) => courseAPI.createCourse(courseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, courseData }) =>
      courseAPI.updateCourse(courseId, courseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId) => courseAPI.deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
