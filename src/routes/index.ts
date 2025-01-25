import { Router } from "express"
import { NotFoundError } from "@/utils/errors"
import auth from "./auth"
import task from "./task"
import admin from "./admin"

const router = Router()

router.use("/api/admin", admin)
router.use("/api/auth", auth)
router.use("/api/task", task)

router.use("*", () => {
  throw new NotFoundError("Wrong address")
})

export default router
