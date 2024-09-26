import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Clean dishes", completedAt: new Date() },
  { id: 2, text: "Do homework", completedAt: new Date() },
  { id: 3, text: "Buy meat", completedAt: null },
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
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: "Property text is required" });
    const newTodo = {
      id: todos.length + 1,
      text,
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

    const { text, completedAt } = req.body;
    todo.text = text || todo.text;
    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));
    res.json(todo);
  };

  deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const index = todos.findIndex(todo => todo.id === id)
    // const todo = todos.find((todo) => todo.id === id);
    // if (!todo) return res.status(404).json(`TODO with id ${id} not found`);
    if (index === -1) return res.status(404).json(`TODO with id ${id} not found`);

    // todos.splice(todos.indexOf(todo), 1);
    todos.splice(index, 1);
    res.json(`Todo with id ${id} deleted`);
  }; 
}
