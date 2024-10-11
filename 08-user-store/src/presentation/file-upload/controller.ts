import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services/file-upload.service";
import { error } from "console";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {
  constructor(private readonly uploadFileService:FileUploadService) {}

  private handleErrors(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  uploadFile = async (req: Request, res: Response) => {
    const files = req.files
    if(!req.files || Object.keys(req.files).length === 0){
      return res.status(400).json({error:'No files were uploaded'})
    }

    const file = req.files.file as UploadedFile
    this.uploadFileService.uploadSingle(file)
    .then(file=> res.json(file))
    .catch(error => this.handleErrors(error,res))
  };

  uploadMultipleFiles = async (req: Request, res: Response) => {
    res.json("upload multiple files");
  };
}
