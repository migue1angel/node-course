import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {
  constructor(private readonly uploadFileService: FileUploadService) {}

  private handleErrors(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }


  uploadFile = async (req: Request, res: Response) => {
    const type = req.params.type;

    const file = req.body.files[0] as UploadedFile;

    this.uploadFileService
      .uploadSingle(file, `uploads/${type}`)
      .then((file) => res.json(file))
      .catch((error) => this.handleErrors(error, res));
  };

  
  uploadMultipleFiles = async (req: Request, res: Response) => {
    const type = req.params.type;
    const files = req.body.files as UploadedFile[];

    this.uploadFileService
      .uploadMultiple(files, `uploads/${type}`)
      .then((file) => res.json(file))
      .catch((error) => this.handleErrors(error, res));
  };
}
