import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";

export class UploadFileRoutes {
  static get routes() {
    const router = Router();
    const fileUploadService= new FileUploadService
    const controller = new FileUploadController(fileUploadService);
    router.post("/single/:type", controller.uploadFile);
    router.post("/multiple/:type", controller.uploadMultipleFiles);
    return router;
  }
}
