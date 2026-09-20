import http, { type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3000;

/**
 * get -> read
 * post -> create
 * put -> update
 * patch -> update partial data
 * delete -> delete
 */

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World!");
  },
);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
