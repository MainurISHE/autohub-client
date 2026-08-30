import type { Car } from "@/entities/car/model/types/car.types";

export interface PublicProfile {
  id: number;
  name: string;
  lastName: string;
  avatarUrl: string | null;
  createdAt: string;
  cars: Car[];
}