import { NextFunction } from "express";
import { AuthRequest } from "./requireAuth";
import { Request, Response } from "express";
//Take in request, check for "page" and "limit" query parameters. Assign it to req.pagination object
const defaultLimit = 10;
const defaultPage = 1;

export interface PaginatedRequest extends Request {
  pagination: {
    page: number;
    limit: number;
  };
}

export default function assignPagination(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const page = parseInt(req.query.page as string) || defaultPage;
  const limit = parseInt(req.query.limit as string) || defaultLimit;
  //Populate req.pagination object with page and limit
  (req as PaginatedRequest).pagination = { page, limit };
  next();
}
