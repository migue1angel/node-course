import fs from "fs";

export interface SaveFileUseCase {
  execute: (options: Options) => boolean;
}

export interface Options {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor(
    /** repository: storage repository*/
  ) {}

  execute({
    fileContent,
    fileName = "table",
    fileDestination = "outputs",
  }: Options): boolean {
    try {
      fs.mkdirSync(fileDestination, { recursive: true });
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
      console.log("File created!!");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}