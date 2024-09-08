import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class TodosController {
  constructor() {}

  getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    return res.json(todos);
  };

  getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: " Id argument is not a number" });
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with ${id} not found` });
  };

  createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: "Property text is required" });

    const todo = await prisma.todo.create({
      data: { text },
    });

    res.json(todo);
  };

  updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const { text, completedAt } = req.body;
    if (isNaN(id))
      return res.status(400).json({ error: "Argument id should be a number" });

    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    if (!todo)
      return res.status(404).json({ error: `TODO with id ${id} not found` });

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        text,
        completedAt: completedAt ? new Date(completedAt) : completedAt,
      },
    });

    res.json(updatedTodo);
  };

  deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    if (!todo)
      return res.status(404).json({ error: `TODO with id ${id} not exists` });

    await prisma.todo.delete({
      where: { id },
    });
    res.json(`Todo with id ${id} deleted`);
  };
}