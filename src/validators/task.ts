import { z, ZodSchema } from "zod"

export const taskSchema: ZodSchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  dueDate: z.string().optional(),
})

export const updateTaskSchema: ZodSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  dueDate: z.string().optional(),
})
