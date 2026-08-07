import { useMutation } from "@tanstack/react-query";
import { uploadService } from "../api/upload.service";

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: uploadService.upload,
  });
};