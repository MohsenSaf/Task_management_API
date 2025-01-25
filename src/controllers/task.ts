import prisma from "@/prisma"
import { Request, Response } from "express"
import { log } from "@/utils/logger"
import { BadRequestError, NotFoundError } from "@/utils/errors"
import { TaskBody } from "@/types/task"
import { ZodError } from "zod"

class TaskController {
  async create(req: Request, res: Response) {
    const { title, description, priority, dueDate } = req.body

    let date

    if (dueDate) {
      const splitDate = dueDate.split("-")
      date = new Date(Date.UTC(splitDate[0], splitDate[1] - 1, splitDate[2]))
    }

    try {
      const task = await prisma.task.create({
        data: {
          title,
          description,
          priority: priority,
          dueDate: dueDate ? date : null,
          userId: req.user!.id,
        },
      })

      log({ message: "add:task", metadata: { user: req.user, task: task } })

      res.json(task)
    } catch (error: any) {
      console.log(error)
      if (error.code === "P2002") {
        throw new BadRequestError("Title is duplicate!")
      }
      res.status(400).json(error)
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params

    const task = await prisma.task.findUnique({
      where: {
        id: Number(id),
        userId: req.user?.id,
      },
    })

    if (!task) {
      throw new NotFoundError("Task not found")
    }

    res.json(task)
  }

  async list(req: Request, res: Response) {
    const { page = 1 } = req.query
    const pageSize = 5

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user?.id,
      },
      skip: (Number(page) - 1) * 5,
      take: pageSize + 1,
    })

    const hasNextPage = tasks.length > pageSize

    const paginatedTasks = hasNextPage ? tasks.slice(0, pageSize) : tasks

    res.json({
      tasks: paginatedTasks,
      page,
      hasNextPage,
    })
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const { title, description, dueDate, priority } = req.body

    let formateDate

    if (dueDate) {
      const splitDate = dueDate.split("-")
      formateDate = new Date(
        Date.UTC(splitDate[+0], splitDate[+1] - 1, splitDate[+2])
      )
      console.log(formateDate)
    }

    try {
      const task = await prisma.task.update({
        where: {
          id: Number(id),
          userId: req.user?.id,
        },
        data: {
          title: title,
          description: description,
          dueDate: formateDate,
          priority: priority,
        },
      })
      res.json(task)
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new BadRequestError("Title is duplicate")
      }
      if (error.code === "P2025") {
        throw new NotFoundError("Task not found")
      }
      res.status(400).json(error)
    }
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params

    let task

    try {
      task = await prisma.task.delete({
        where: {
          id: Number(id),
          userId: req.user?.id,
        },
      })

      res.json(task)
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new NotFoundError("Task not found")
      }
      res.status(400).json(error)
    }
  }
}

export default new TaskController()
