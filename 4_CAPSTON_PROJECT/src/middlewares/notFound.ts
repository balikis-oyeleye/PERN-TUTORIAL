import { Request, Response } from "express";

export function notFound(_req: Request, res: Response) {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
}
