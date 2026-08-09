import { useMutation } from "@tanstack/react-query";
import { carService } from "../api/car.service";

export const useDeleteImageMutation = () => {
  return useMutation({
    mutationFn: carService.deleteImage,
  });
};