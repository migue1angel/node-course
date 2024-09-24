import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity } from "../../domain";
import { UpdateTodoDto } from "../../domain/dtos/todo/update-todo.dto";

export class TodoDatasourceImpl implements TodoDataSource {
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map(TodoEntity.fromObject)
  }
  findById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  deleteTodo(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
}
