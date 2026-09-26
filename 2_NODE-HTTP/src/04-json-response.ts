import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 3000;

type User = {
  id: number;
  name: string;
  email: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  error?: string;
  data: T;
};

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "0FtYU@example.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "0FtYU@example.com",
  },
];

function sendJson<T>(
  res: ServerResponse,
  statusCode: number,
  data: ApiResponse<T>,
) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";

    const requestUrl = new URL(req.url ?? "/", `http://${req.headers.host}`);

    const pathName = requestUrl.pathname;

    if (method === "GET" && pathName === "/") {
      sendJson(res, 200, {
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    }
  },
);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
