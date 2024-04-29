// Purpose: Middleware to check if the user is a Manager.
import { Response, NextFunction } from "express";
import { AuthRequest } from "./requireAuth";

const checkIsManager = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.token === process.env.MANAGER_TOKEN) {
    next();
  } else {
    res.status(401).json({ message: "You are not a Manager" });
  }
};

export default checkIsManager;
