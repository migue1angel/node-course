import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import {  ProductService } from "../services";
import { ProductController } from "./controller";

export class ProductRoutes {
  static get routes() {
    const router = Router();
    const productService = new ProductService();
    const controller = new ProductController(productService);
    router.post("/", [AuthMiddleware.validateJWT], controller.create);
    router.get("/", controller.findAll);
    return router;
  }
}
