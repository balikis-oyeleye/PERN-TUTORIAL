import http, { type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";

    const requestUrl = new URL(req.url ?? "", `http://${req.headers.host}`);

    const pathName = requestUrl.pathname;

    if (method === "GET" && pathName === "/") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Home page");
    } else if (method === "GET" && pathName === "/about") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("About page");
    } else if (method === "GET" && pathName === "/contact") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Contact page");
    } else if (method === "GET" && pathName === "/health") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("The server is healthy");
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Page not found");
    }
  },
);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
