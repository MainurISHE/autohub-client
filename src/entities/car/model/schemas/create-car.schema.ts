import { z } from "zod";

export const createCarSchema = z.object({
  title: z.string().min(1, "Title is required"),

  description: z.string().min(1, "Description is required"),

  price: z.coerce
    .number()
    .min(1000, "Price must be at least 1000"),

  year: z.coerce
    .number()
    .min(1886)
    .max(new Date().getFullYear() + 1),

  mileage: z.coerce.number().positive(),

  engineVolume: z.coerce.number().positive(),

  horsepower: z.coerce.number().positive(),

  brandId: z.coerce.number(),

  fuelType: z.string(),

  transmission: z.string(),

  driveType: z.string(),

  bodyType: z.string(),

  color: z.string(),

  status: z.string(),
});

export type CreateCarSchema = z.input<typeof createCarSchema>;
export type CreateCarData = z.output<typeof createCarSchema>;