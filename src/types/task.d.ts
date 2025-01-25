import { TaskPriority, TaskStatus } from "@prisma/client"

interface TaskBody {
  id: number
  title: string
  description?: string
  priority?: TaskPriority
  dueDate?: string
  status?: TaskStatus
  createdAt: Date
  updatedAt: Date
}
