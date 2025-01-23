import { Router } from "express"
import auth from "./auth"
import { NotFoundError } from "@/utils/errors"

const router = Router()

router.use("/api/auth", auth)

router.use("*", () => {
  throw new NotFoundError("Wrong address")
})

export default router
