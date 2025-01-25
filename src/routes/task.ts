import { Router } from "express"
import TaskController from "@/controllers/task"
import acl from "@/middlewares/acl"
import validate from "@/middlewares/validate"
import { taskSchema, updateTaskSchema } from "@/validators/task"

const router = Router()

router.post("/create", acl("USER"), validate(taskSchema), TaskController.create)
router.get("/:id(\\d+)", acl("USER"), TaskController.get)
router.get("/list", acl("USER"), TaskController.list)
router.put(
  "/:id(\\d+)/update",
  acl("USER"),
  validate(updateTaskSchema),
  TaskController.update
)
router.delete("/:id(\\d+)", acl("USER"), TaskController.remove)

export default router
