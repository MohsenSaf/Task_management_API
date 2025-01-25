import { z, ZodSchema } from "zod"

export const registerSchema: ZodSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
})

export const loginSchema: ZodSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export const getTokenSchema: ZodSchema = z.object({
  refreshToken: z.string().length(128),
})
