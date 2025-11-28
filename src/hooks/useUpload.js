import { useMutation } from "@tanstack/react-query";
import { uploadAPI } from "../api/api/upload.api";

export const useUploadImg = () => {
  return useMutation({
    mutationFn: (file) => uploadAPI.uploadImg(file),
  });
};
