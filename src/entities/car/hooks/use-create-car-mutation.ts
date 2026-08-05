import { useMutation, useQueryClient } from "@tanstack/react-query";
import { carService } from "../api/car.service";

export const useCreateCarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: carService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
  });
};