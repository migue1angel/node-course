import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middlewares/file-middleware";
import { TypeMiddleware } from "../middlewares/type-middleware";

export class UploadFileRoutes {
  static get routes() {
    const router = Router();
    const fileUploadService = new FileUploadService();
    const controller = new FileUploadController(fileUploadService);

    router.use(FileUploadMiddleware.containFiles);
    router.use(TypeMiddleware.validTypes(["users", "categories", "products", "pdf"])); // al trabajarlo de esta manera todavía no sabemos cuál es la request
    //revisa el método validTypes 
    router.post("/single/:type", controller.uploadFile);
    router.post("/multiple/:type", controller.uploadMultipleFiles);
    return router;
  }
}
