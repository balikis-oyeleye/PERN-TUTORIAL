import http, { type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";

    const requestUrl = new URL(req.url ?? "", `http://${req.headers.host}`);
    res.setHeader("Content-Type", "text/plain");

    const pathName = requestUrl.pathname;

    if (method === "POST" && pathName === "/users") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        res.end(body);
      });
    }
  },
);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
