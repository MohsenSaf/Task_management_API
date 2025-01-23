import jwt from "jsonwebtoken"
import { NotAuthorizeError } from "@/utils/errors"
import { Request, Response, NextFunction } from "express"

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1]

    if (token) {
      jwt.verify(token, String(process.env.JWT_SECRET), (error, payload) => {
        if (error) {
          throw new NotAuthorizeError(String(error))
        }

        req.user = payload as User 
        next()
      })
    }
  } else {
    req.user = req.session?.user 
    next()
  }
}
