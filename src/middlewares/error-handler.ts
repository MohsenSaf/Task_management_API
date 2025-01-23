import { JsonSchemaValidation } from "express-jsonschema"
import { Request, Response, NextFunction } from "express"
import { log } from "@/utils/logger"

export default (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = error.status || 500

  log({
    level: "error",
    message: error.message,
    metadata: {
      user: req.user ?? "Unauthenticated User",
      url: req.url,
      status,
    },
  })

  if (error instanceof JsonSchemaValidation) {
    res.status(400).json({
      code: 400,
      message: "Validation Error",
      fields: error.validations,
    })
    return
  }

  const message =
    process.env.NODE_ENV === "development" || status < 500
      ? error.message
      : "Server error, Please call to administrator"

  res.status(status).json({
    code: status,
    message,
  })
}
