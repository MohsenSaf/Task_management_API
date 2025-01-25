import { Response, Request, NextFunction } from "express"
import { ZodError, ZodSchema } from "zod"

export default function validate<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error.errors.map((err) => ({
            message: err.message,
            path: err.path.join("."),
          })),
        })
      }
    }
  }
}
