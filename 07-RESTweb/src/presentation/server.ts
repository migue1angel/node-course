import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}
export class Server {
  private port: number;
  private publicPath: string;
  private routes: Router;
  private app = express();

  constructor(options: Options) {
    const { port, publicPath = "public", routes } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }
  start() {
    // middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    // public folder
    this.app.use(express.static("src/public"));

    // routes
    this.app.use(this.routes);

    // * SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname,
        `../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`server running on port ${this.port}`);
    });
  }
}
