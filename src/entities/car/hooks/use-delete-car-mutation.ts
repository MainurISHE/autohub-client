import { useMutation, useQueryClient } from "@tanstack/react-query";
import { carService } from "../api/car.service";

export const useDeleteCarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: carService.remove,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });

      queryClient.removeQueries({
        queryKey: ["car", id],
      });
    },
  });
};