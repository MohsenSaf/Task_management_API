import { Router } from "express"
import validate from "@/middlewares/validate"
import { updateTaskSchema } from "@/validators/task"
import acl from "@/middlewares/acl"
import TaskController from "@/controllers/Admin/task"

const router = Router()

router.get("/:id(\\d+)", acl("ADMIN"), TaskController.get)
router.get("/list", acl("ADMIN"), TaskController.list)
router.put(
  "/:id(\\d+)/update",
  acl("ADMIN"),
  validate(updateTaskSchema),
  TaskController.update
)
router.delete("/:id(\\d+)", acl("ADMIN"), TaskController.remove)

export default router
