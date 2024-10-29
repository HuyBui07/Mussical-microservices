import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type UserType = {
  _id: string;
};

interface JwtPayload {
  _id: string;
}

interface AuthRequest extends Request {
  token?: string;
  user_id?: string;
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
    req.token = token;
    req.user_id = _id;

    // TODO: Check if user existed
    // const response = await fetch("http://localhost:5000/user/" + _id);
    // if (response.status !== 200) {
    //   res.status(401).json({ message: "Unauthorized request" });
    //   return;
    // }
    // const user = await response.json();
    // req.user = user;
    next();
  } catch (err: any) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized request" });
  }
};

export { requireAuth, AuthRequest };
