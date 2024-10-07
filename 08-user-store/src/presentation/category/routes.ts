import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class CategoryRoutes {
  static get routes() {
    const router = Router();
    const controller = new CategoryController();
    router.post("/", [AuthMiddleware.validateJWT], controller.create);
    router.get("/", controller.findAll);
    return router;
  }
}
