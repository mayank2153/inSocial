import { z } from "zod";

export const RegisterValidator = z.object({
  email: z.string().email(),
  username: z.string().min(3, "username must be atleast 3 characters long"),
  password: z.string().min(6, "password must be atleast 6 characters").max(255),
});

export const LoginValidator = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6, "password must be atleast 6 characters").max(255),
  username: z.string().optional(),
});
