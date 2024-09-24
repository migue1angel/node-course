import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos/todo/update-todo.dto";
import { TodoRepository } from "../../domain";

export class TodosController {
  constructor(private readonly todoRepoitory: TodoRepository) {}

  getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepoitory.getAll();
    return res.json(todos);
  };

  getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    try {
      const todo = await this.todoRepoitory.findById(id);
      return res.json(todo); //en caso de tener más logica adicinal no colocar el return ya que terminará con el proceso
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(404).json({ error });
    const todo = await this.todoRepoitory.create(createTodoDto!);
    return res.json(todo);
  };

  updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    try {
      const updatedTodo = await this.todoRepoitory.updateTodo(updateTodoDto!);
      return res.json(updatedTodo);
    } catch (error) {
      res.json({error})
    }
  };

  deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const deletedTodo = await this.todoRepoitory.deleteTodo(id)
    return res.json(deletedTodo)
  };
}
