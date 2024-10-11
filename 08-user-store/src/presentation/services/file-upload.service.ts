import { UploadedFile } from "express-fileupload";
import path, { dirname } from "path";
import fs from "fs";
import { Uuid } from "../../config";
import { CustomError } from "../../domain";

export class FileUploadService {
  constructor() {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "pdf"]
  ) {
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? "";

      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest("Invalid file extension");
      }
      const destination = path.resolve(__dirname, "../../../", folder);

      this.checkFolder(destination);
      const filename = `${Uuid.v4()}.${fileExtension}`;

      file.mv(`${destination}/${filename}`);
      return { filename };
    } catch (error) {
      throw error;
    }
  }

  uploadMultiple(
    file: any[],
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "pdf"]
  ) {}
}
