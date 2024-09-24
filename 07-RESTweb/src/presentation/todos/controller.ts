import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos/todo/update-todo.dto";
import {
  CreateTodo,
  DeleteTodo,
  FindTodo,
  FindTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain";

export class TodosController {
  constructor(private readonly todoRepoitory: TodoRepository) {}

  getTodos = (req: Request, res: Response) => {
    new FindTodos(this.todoRepoitory)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ error }));
  };

  getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    new FindTodo(this.todoRepoitory)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(404).json({ error });
    new CreateTodo(this.todoRepoitory)
      .execute(createTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepoitory)
      .execute(updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    new DeleteTodo(this.todoRepoitory)
    .execute(id)
    .then(todo => res.json(todo))
    .catch(error => res.status(400).json({error}))
  };
}
