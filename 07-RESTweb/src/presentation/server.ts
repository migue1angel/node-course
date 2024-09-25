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
    // When you first visit the site (e.g., /),
    // Express looks in the public directory (src/public) for files.
    // If there's an index.html, it serves that as the main page.

    // routes
    this.app.use(this.routes);

    // * SPA Single Page Aplication
    this.app.get("*", (req, res) => { //wild card comodin
      const indexPath = path.join(
        __dirname,
        `../${this.publicPath}/index.html`
      );
      
      res.sendFile(indexPath);
    });
    // If you visit any other route (e.g., /about, /profile), 
    // and there's no matching file in the public directory, 
    // Express hits the wildcard route (this.app.get("*")), 
    // which serves the same index.html file.

    this.app.listen(this.port, () => {
      console.log(`server running on port ${this.port}`);
    });
  }
}
