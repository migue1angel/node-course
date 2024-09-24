import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface FindTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class FindTodo implements FindTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}
  execute(id: number): Promise<TodoEntity> {
    return this.repository.findById(id);
  }
}
