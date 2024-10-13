import { NextFunction, Request, Response } from "express";

export class TypeMiddleware {
  static validTypes(validTypes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const type = req.url.split("/").at(2) ?? ""; //accedemos a la url ya que no contamos con la request
      if (!validTypes.includes(type))
        return res.status(400).json({ error: "Invalid type" });

      next();
    };
  }
}
