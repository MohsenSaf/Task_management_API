import { Router } from "express"
import { NotFoundError } from "@/utils/errors"
import task from "./task"

const router = Router()

router.use("/task", task)


export default router
