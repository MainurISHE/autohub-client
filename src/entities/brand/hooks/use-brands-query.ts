import { useQuery } from "@tanstack/react-query";
import { brandService } from "../api/brand.service";

export const useBrandQuery = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: brandService.getAll,
  });
};
