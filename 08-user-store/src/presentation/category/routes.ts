import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services";

export class CategoryRoutes {
  static get routes() {
    const router = Router();
    const categoryService = new CategoryService();
    const controller = new CategoryController(categoryService);
    router.post("/", [AuthMiddleware.validateJWT], controller.create);
    router.get("/", controller.findAll);
    return router;
  }
}
