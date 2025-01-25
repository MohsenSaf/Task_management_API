import prisma from "@/prisma"
import { Request, Response } from "express"
import { log } from "@/utils/logger"
import { BadRequestError, NotFoundError } from "@/utils/errors"

class TaskController {
  async get(req: Request, res: Response) {
    const { id } = req.params

    const task = await prisma.task.findUnique({
      where: {
        id: Number(id),
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
    }

    try {
      const task = await prisma.task.update({
        where: {
          id: Number(id),
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
