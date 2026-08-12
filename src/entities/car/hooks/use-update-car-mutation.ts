import { useMutation, useQueryClient } from "@tanstack/react-query";
import { carService } from "../api/car.service";
import { CreateCarDto } from "../model/dto/create-car.dto";

export const useUpdateCarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateCarDto;
    }) => carService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });

      queryClient.invalidateQueries({
        queryKey: ["car", variables.id],
      });
    },
  });
};