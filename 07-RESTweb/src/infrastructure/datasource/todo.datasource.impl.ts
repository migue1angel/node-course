import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity } from "../../domain";
import { UpdateTodoDto } from "../../domain/dtos/todo/update-todo.dto";

export class TodoDatasourceImpl implements TodoDataSource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto,
    });
    return TodoEntity.fromObject(todo);
  }
  
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map(TodoEntity.fromObject);
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: { id },
    });
    if (!todo) throw `Todo with id ${id} not found`;
    return TodoEntity.fromObject(todo);
  }

  async updateTodo(
    updateTodoDto: UpdateTodoDto
  ): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);
    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto.values,
    });
    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteTodo(id: number): Promise<TodoEntity> {
    await this.findById(id);
    const deleted = await prisma.todo.delete({
      where: { id },
    });
    return TodoEntity.fromObject(deleted);
  }
}
