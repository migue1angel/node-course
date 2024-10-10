import { Request, Response } from "express";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { ProductService } from "../services";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private handleErrors(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  create = async (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id,
    });

    if (error) {
      return res.status(400).json({ error });
    }
    this.productService
      .createProduct(createProductDto!)
      .then((product) => res.status(201).json(product))
      .catch((error) => this.handleErrors(error, res));
  };

  findAll = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    this.productService
      .findAll(paginationDto!)
      .then((products) => res.json(products))
      .catch((error) => this.handleErrors(error, res));
  };
}
