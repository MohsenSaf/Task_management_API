import MethodOverride from "method-override"
import { Request, Response } from "express"

export default MethodOverride(function (req: Request, res: Response) {
  if (req.body && typeof req.body === "object" && "_method" in req.body) {
    const method = req.body._method
    delete req.body._method
    return method
  }
})
