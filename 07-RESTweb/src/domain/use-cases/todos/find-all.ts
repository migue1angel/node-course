import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface FindTodosUseCase {
  execute(): Promise<TodoEntity[]>;
}

export class FindTodos implements FindTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}
  execute(): Promise<TodoEntity[]> {
    return this.repository.getAll();
  }
}
