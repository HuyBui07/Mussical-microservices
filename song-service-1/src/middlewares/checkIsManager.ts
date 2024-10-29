// Purpose: Middleware to check if the user is a Manager.
import { Response, NextFunction } from "express";
import { AuthRequest } from "./requireAuth";

const checkIsManager = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    if (token === process.env.MANAGER_TOKEN) {
      next();
    } else {
      res.status(401).json({ message: "You are not a Manager" });
    }
  } else {
    console.log("No token provided");
    res.status(401).json({ message: "No token provided" });
  }
};

export default checkIsManager;
