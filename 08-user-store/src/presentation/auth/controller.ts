import { Request, Response } from "express";

export class AuthController {
  constructor() {}

  register = (req: Request, res: Response) => {
    console.log(req);
    
    res.json("registration user");
  };

  loginUser = (req: Request, res: Response) => {
    res.json("login user");
  };

  validateEmail = (req: Request, res: Response) => {
    res.json("validate email");
  };
}
