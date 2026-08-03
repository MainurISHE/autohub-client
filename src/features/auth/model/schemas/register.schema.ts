import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  lastName: z.string().min(2, "Last name must contain at least 2 characters"),

  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export type RegisterSchema = z.infer<typeof registerSchema>