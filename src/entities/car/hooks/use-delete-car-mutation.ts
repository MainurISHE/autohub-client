import { useMutation, useQueryClient } from "@tanstack/react-query";
import { carService } from "../api/car.service";
import { toast } from "sonner";

export const useDeleteCarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: carService.remove,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-cars"],
      });

      queryClient.removeQueries({
        queryKey: ["car", id],
      });

      toast.success("Car deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete car");
    },
  });
};
