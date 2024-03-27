import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

type UserType = {
  _id: string;
};

interface JwtPayload {
  _id: string;
}

interface AuthRequest extends Request {
  user?: UserType;
}

const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "No authorization header found" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JwtPayload;
    req.user = await User.findById(_id).select("_id");
    next();
  } catch (err: any) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized request" });
  }
};

export { requireAuth, AuthRequest };