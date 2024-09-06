import http2 from "http2";
import fs from "fs";
const server = http2.createSecureServer({
  key:fs.readFileSync('keys/server.key'),
  cert:fs.readFileSync('keys/server.crt')
},
(req, res) => {
  console.log(req.url);

  if (req.url === "/") {
    const htmlFile = fs.readFileSync("src/public/index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlFile);
    return;
  }

  if (req.url?.endsWith(".js")) {
    res.writeHead(200, { "Content-Type": "application/javascript" });
  } else if (req.url?.endsWith(".css")) {
    res.writeHead(200, { "Content-Type": "text/css" });
  }

  const responseContent = fs.readFileSync(`src/public${req.url}`, "utf-8");
  res.end(responseContent);
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
