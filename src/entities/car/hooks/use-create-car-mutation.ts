import { useMutation, useQueryClient } from "@tanstack/react-query";
import { carService } from "../api/car.service";
import { toast } from "sonner";

export const useCreateCarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: carService.create,

    onSuccess: () => {
      toast.success("Car created successfully");

      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },

    onError: () => {
      toast.error("Failed to create car");
    },
  });
};
