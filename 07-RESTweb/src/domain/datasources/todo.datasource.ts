import { CreateTodoDto } from "../dtos";
import { UpdateTodoDto } from "../dtos/todo/update-todo.dto";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDataSource {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

  //todo: pagination
  abstract getAll(): Promise<TodoEntity[]>
  abstract findById(id:number): Promise<TodoEntity>
  abstract updateTodo(id:number, updateTodoDto:UpdateTodoDto): Promise<TodoEntity>
  abstract deleteTodo(id:number): Promise<TodoEntity>
}
