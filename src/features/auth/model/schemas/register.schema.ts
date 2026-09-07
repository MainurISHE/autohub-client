import z from "zod";

const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]+$/;

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .regex(nameRegex, "Name can contain letters only"),

  lastName: z
    .string()
    .min(2, "Last name must contain at least 2 characters")
    .regex(nameRegex, "Last name can contain letters only"),

  email: z.string().email("Invalid email address"),

  phoneNumber: z
    .string()
    .min(10, "Invalid phone number")
    .or(z.literal("")),

  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;