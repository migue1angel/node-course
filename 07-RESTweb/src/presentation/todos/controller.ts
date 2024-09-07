import { Request, Response } from "express";

const todos = [
  { id: 1, name: "Clean dishes", completedAt: new Date() },
  { id: 2, name: "Do homework", completedAt: new Date() },
  { id: 3, name: "Buy meat", completedAt: null },
];

export class TodosController {
  constructor() {}

  getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: " Id argument is not a number" });
    const todo = todos.find((todo) => todo.id === id);
  
    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with ${id} not found` });
  };

  createTodo = (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ error: "Property name is required" });
    const newTodo = {
      id: todos.length + 1,
      name,
      completedAt: new Date(),
    };

    todos.push(newTodo);
    res.json(newTodo);
  };

  updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "Argument id should be a number" });
    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `TODO with id ${id} not found` });

    const { name, completedAt } = req.body;
    todo.name = name || todo.name;
    completedAt === 'null'
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt) );
    res.json(todo);
  };

}
