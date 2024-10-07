import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";

export class CategoryController {
  constructor() {}

  private handleErrors(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  async create(req: Request, res: Response) {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body) 
    if(error) res.status(400).json({error})
    res.json(createCategoryDto);
  }

  async findAll(req: Request, res: Response) {
    res.json("get  categories");
  }
}
