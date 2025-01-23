import { ROLE_HIERARCHY } from "@/configs/roles"
import { ForbiddenError, NotAuthorizeError } from "@/utils/errors"
import { Request, Response, NextFunction } from "express"

export default function acl(roleName: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new NotAuthorizeError()
    }

    const { role } = req.user

    if (role === roleName || ROLE_HIERARCHY[role]?.includes(roleName)) {
      return next()
    }

    throw new ForbiddenError()
  }
}
