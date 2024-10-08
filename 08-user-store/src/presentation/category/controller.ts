import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";
import { CategoryService } from "../services";
import { error } from "console";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleErrors(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  create = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) res.status(400).json({ error });

    this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => this.handleErrors(error, res));
  };

  findAll = async (req: Request, res: Response)=> {
    this.categoryService.findAll()
    .then(categories => res.json(categories))
    .catch(error=> this.handleErrors(error, res))
    
  }
}
