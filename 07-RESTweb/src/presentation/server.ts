import express from "express";
import path from "path";

interface Options {
  port: number;
  publicPath?: string;
}
export class Server {
  private port: number;
  private publicPath: string;
  private app = express();

  constructor(options: Options) {
    const { port, publicPath = "public" } = options;
    this.port = port;
    this.publicPath = publicPath;
  }
  start() {

    // middlewares

    // public folder
    this.app.use(express.static("src/public"));

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
